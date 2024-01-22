from fastapi import status, HTTPException, Depends, APIRouter, Response
from sqlalchemy.orm import Session
from .. database import get_db
from .. import models, schemas, utilities

router = APIRouter(
    prefix="/users",
    tags=['Users']
)


#dodawanie userów
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists")

    hashed_password = utilities.hash(user.password)
    user.password = hashed_password
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


#pobieranie userów po id 
@router.get("/{id}", response_model=schemas.UserOut)
def get_user(id: int, db: Session = Depends(get_db)):

    user = db.query(models.User).filter(models.User.id == id).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= f"user of id {id} desn't exist")
    
    return user