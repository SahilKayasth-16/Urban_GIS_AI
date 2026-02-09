from sqlalchemy import Column, Integer, String, ForeignKey, Float, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True)
    password_hash = Column(String)
    role = Column(String, default="user", nullable=False)

    owned_businesses = relationship(
        "BusinessListing",
        back_populates = "owner",
        foreign_keys="BusinessListing.owner_id"
    )

    approved_businesses = relationship(
        "BusinessListing",
        back_populates = "approver",
        foreign_keys = "BusinessListing.approved_by"
    )

class BusinessListing(Base):
    __tablename__ = "business_listings"

    id = Column(Integer, primary_key=True, index=True)

    owner_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    category_id = Column(Integer, ForeignKey("business_categories.id"), nullable=True)

    business_name = Column(String, nullable=False)
    description = Column(String, nullable=True)

    address = Column(String, nullable=False)
    city = Column(String, nullable=False) 

    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    status = Column(String, default="pending")
    approved_by = Column(Integer, ForeignKey("users.id"), nullable=True)

    owner = relationship(
        "User",
        foreign_keys = [owner_id],
        back_populates= "owned_businesses"       
    )

    approver = relationship(
        "User",
        foreign_keys=[approved_by],
        back_populates="approved_businesses"
    )

    category = relationship(
        "BusinessCategory",
        back_populates= "businesses"
    )

class BusinessCategory(Base):
    __tablename__ = "business_categories"

    id = Column(Integer, primary_key=True, index=True)
    category_type = Column(String, nullable=False, unique=True)

    businesses = relationship(
        "BusinessListing",
        back_populates="category",
        foreign_keys="BusinessListing.category_id"
    )