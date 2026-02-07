from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User, Business
from app.core.security import get_current_user

router = APIRouter(prefix="/admin", tags=["Admin"])

def admin_only(user = Depends(get_current_user)):

    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access only.")
    return user

#=============== GET ALL BUSINESSES FOR APPROVAL ONLY ===============#
@router.get("/businesses")
def get_all_businesses( db: Session = Depends(get_db), admin = Depends(admin_only)):
    return db.query(Business).all()

#=============== APPROVE / REJECT BUSINESSES ===============#
@router.put("/business/{business_id}/{status}")
def update_business_status(
    business_id: int,
    status: str,
    db: Session = Depends(get_db),
    admin = Depends(admin_only)
):
    if status not in ["approved", "rejected"]:
        raise HTTPException(status_code=400, detail="Invalid status.")
    
    business = db.query(Business).filter(Business.id == business_id).first()

    if not business:
        raise HTTPException(status_code=404, detail="Business not found.")
    
    business.status = status
    db.commit()
    db.refresh(business)

    return {
        "message": f"Business {status} successfully.",
        "business_id": business_id,
        "status": status
    }

