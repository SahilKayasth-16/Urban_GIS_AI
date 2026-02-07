from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True)
    password_hash = Column(String)
    role = Column(String, default="user", nullable=False)

    owned_businesses = relationship(
        "Business",
        foreign_keys = "Business.owner_id",
        back_populates = "owner"
    )

    approved_businesses = relationship(
        "Business",
        back_populates = "approver",
        foreign_keys = "Business.approved_by"
    )

class Business(Base):
    __tablename__ = "businesses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    owner_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    approved_by = Column(Integer, ForeignKey("users.id"), nullable=True)

    name = Column(String)
    category = Column(String)
    address = Column(String)
    city = Column(String)

    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    status = Column(String, default="pending")

    owner = relationship(
        "User",
        foreign_keys = [owner_id],
        back_populates= "owned_businesses"       
    )

    approver = relationship(
        "User",
        foreign_keys = [approved_by],
        back_populates= "approved_businesses"
    )