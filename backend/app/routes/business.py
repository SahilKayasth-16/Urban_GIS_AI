from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import Business
from app.core.security import get_current_user

router = APIRouter(prefix="/business", tags=["Business"])

@router.post("/register")
def register_business(data: dict, db: Session = Depends(get_db), current_user = Depends(get_current_user)):

    if current_user.role != "business_owner":
        raise HTTPException(status_code=403, detail="Only business owner can register business")
    
    new_business = Business(
        name=data["name"],
        category=data["category"],
        address=data["address"],
        city=data["city"],
        latitude=data.get("latitude"),
        longitude=data.get("longitude"),
        owner_id=current_user.id
    )

    db.add(new_business)
    db.commit()
    db.refresh(new_business)

    return {
        "message": "Business registered successfully. Waiting for approval."
    }
#=============== GET BUSINESS OF LOGGED IN OWNER ===============#
@router.get("/my")
def my_businesses(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    businesses = (
        db.query(Business)
        .filter(Business.owner_id == current_user.id)
        .all()
    )
    return businesses

#============== GET ALL APPROVED BUSINESSES FOR AI / PUBLIC MAP ===============#
@router.get("/approved")
def approved_businesses(db: Session = Depends(get_db)):
    return db.query(Business).filter(
        Business.status == "approved"
    ).all()
