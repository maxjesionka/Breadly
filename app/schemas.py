from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

class PostBase(BaseModel):
    title: str
    content: str
    published: bool = True
    

class PostCreate(PostBase):
    pass


class UserOut(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime
    name: str
    surname: str
    phone_number: int

    class Config:
        orm_mode = True


class Post(PostBase):
    id: int
    created_at: datetime
    owner_id: int
    owner: UserOut

    class Config:
        orm_mode = True


class PostOut(BaseModel):
    Post: Post
    votes: int


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name : str
    surname : str
    phone_number : int


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    acces_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[int] = None
    

class Vote(BaseModel):
    post_id: int
    dir: int
    

class Product(BaseModel):
    id: int 
    name: str
    short_description: str
    description : str
    price: float
    stock: int
    img: Optional[str]
    stars: int

class ProductAdd(BaseModel):
    name: str
    short_description: str
    description : str
    price: float
    stock: int
    img: Optional[str]
    stars: int

    class Config:
        orm_mode = True

class DetailsOut(BaseModel):
    id:Optional[int] =None
    order_id: Optional[int] = None
    product_id: Optional[int] = None
    quantity: Optional[int] = None
    total_price: Optional[int] = None
    

    class Config:
        orm_mode = True


class OrderAdd(BaseModel):
    details: List[DetailsOut]

    class Config:
        orm_mode = True
    
class OrderOut(BaseModel):
    id: int 
    created_at: datetime
    owner_id: int
    owner: UserOut
    details: List[DetailsOut]


    class Config:
        orm_mode = True



        