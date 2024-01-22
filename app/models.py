from .database import Base 
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Float
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship, mapped_column, Mapped
from typing import List

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    published = Column(Boolean, server_default='TRUE', nullable=False) 
    created_at = Column(TIMESTAMP(timezone=True),nullable=False, server_default=text('now()') )
    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    owner = relationship("User")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False,)
    created_at = Column(TIMESTAMP(timezone=True),nullable=False, server_default=text('now()') )
    name = Column(String, nullable=False,)
    surname = Column(String, nullable=False,)
    phone_number = Column(Integer, nullable=False,)


class Vote(Base):
    __tablename__ = "votes"

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True)


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False, unique=True)
    short_description = Column(String, nullable=False)
    description = Column(String, nullable=False)
    price = Column(Float, nullable = False)
    stock = Column(Integer)
    img = Column(String)
    stars = Column(Integer, nullable = False)


class Order(Base):
    __tablename__ = "Orders"

    id = Column(Integer, primary_key=True, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),nullable=False, server_default=text('now()') )
    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)


    owner = relationship("User", lazy="joined")
    details : Mapped[List["Orderdetail"]] = relationship(lazy="joined")
   

class Orderdetail(Base):
    __tablename__ = "orderdetails"
    id =Column(Integer, primary_key=True, nullable=False)
    # order_id = Column(Integer, ForeignKey("Orders.id", ondelete="CASCADE"), nullable=False)
    order_id = mapped_column(ForeignKey("Orders.id"))
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"),nullable=False)
    quantity = Column(Integer, nullable=False)
    total_price = Column(Integer, nullable=False)

   
