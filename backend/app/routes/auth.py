from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.core.database import get_db
from app.core.security import hash_password, verify_password, create_access_token, get_current_user,ADMIN_USERS
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Auth"])

#=============== REGISTER API ===============#
class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str
    role: str | None = "user"

@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):

    #check if user exists already
    user = db.query(User).filter(User.username == data.username).first()
    if user:
        raise HTTPException(status_code=400, detail="Username alredy exists.")
    
    if data.role not in ["user", "business_owner"]:
        raise HTTPException(status_code=400, detail="Invalid role selection.")
    
    #create new user
    new_user = User(
        username = data.username,
        email = data.email,
        password_hash = hash_password(data.password),
        role = data.role
    )

    #save to database
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully.", "role": data.role}

#=============== LOGIN API ===============#
class LoginRequest(BaseModel):
    username:str
    password: str

@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    username = data.username
    password = data.password

    #admin login
    if username in ADMIN_USERS:
        if password != ADMIN_USERS[username]:
            raise HTTPException(status_code=401, detail="Invalid admin password")
        
        token = create_access_token({
            "user_id": 0,
            "role": "admin"
        })
        
        return {
            "token": token,
            "user": {
                "username": username,
                "role": "admin"
            }
        }

    #user login
    user = db.query(User).filter(User.username == username).first()

    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials.")
    
    token = create_access_token({
        "user_id": user.id,
        "role": user.role
    })
    
    return {
        "token": token,
        "user": {
            "username": user.username,
            "role": user.role
        }
    }

#=============== CHANGE PASSWORD API ===============#
@router.post("/change-password")
def change_password(data: dict, db: Session = Depends(get_db)):
    username = data.get("username")
    old_password = data.get("old_password")
    new_password = data.get("new_password")
    confirm_password = data.get("confirm_password")

    if new_password != confirm_password:
        raise HTTPException(status_code=400, detail="New password and confirm password doesn't match.")

    user = db.query(User).filter(User.username == username).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    
    if not verify_password(old_password, user.password_hash):
        raise HTTPException(status_code=401, detail="Old password is incorrect.")
    
    user.password_hash = hash_password(new_password)

    db.commit()

    return { "message": "Password updated successfully." }