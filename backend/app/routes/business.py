from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import BusinessListing
from app.core.security import get_current_user

router = APIRouter(prefix="/business", tags=["Business"])

@router.post("/register")
def register_business(data: dict, db: Session = Depends(get_db), current_user = Depends(get_current_user)):

    if current_user.role != "business_owner":
        raise HTTPException(status_code=403, detail="Only business owner can register business")
    
    new_business = BusinessListing(
        owner_id=current_user.id,
        category_id=data["category_id"],
        business_name=data["business_name"],
        description=data.get("description"),
        address=data["address"],
        city=data["city"],
        latitude=data["latitude"],
        longitude=data["longitude"],
        status="pending"
    )

    if not isinstance(data["category_id"], int):
        raise HTTPException(status_code=400, detail="Invalid category")


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
    return (
        db.query(BusinessListing)
        .filter(BusinessListing.owner_id == current_user.id)
        .all()
    )

#============== GET ALL APPROVED BUSINESSES FOR AI / PUBLIC MAP ===============#
@router.get("/approved")
def approved_businesses(db: Session = Depends(get_db)):
    return (
        db.query(BusinessListing)
        .filter(BusinessListing.is_verified == True)
        .all()
    )
