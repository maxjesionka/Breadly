from fastapi import Response, status, HTTPException, Depends, APIRouter, Response
from sqlalchemy.orm import Session
from .. database import get_db
from .. import models, schemas, oauth2
from typing import List, Optional, Dict, Union

router = APIRouter(
    prefix="/products",
    tags=['Products']
)


#pobieranie produktów
@router.get("/", response_model= List[schemas.Product] )
def get_products(db: Session = Depends(get_db), limit: int = 10000, skip: int = 0, search: Optional[str]= ""):
    
    products = db.query(models.Product).filter(models.Product.name.contains(search)).limit(limit).offset(skip).all()

    return products


#pobieranie best produktów (best = 5 gwiazdek)
@router.get("/best", response_model= Dict[str, Union[List[schemas.Product], int]])
def get_products(db: Session = Depends(get_db), limit: int = 10000, skip: int = 0, search: Optional[str]= ""):
    
    # Zapytanie wybierające produkty o polu "stars" równe 5
    products = db.query(models.Product).filter(models.Product.name.contains(search), models.Product.stars == 5).limit(limit).offset(skip).all()

    # Liczba produktów spełniających kryteria
    count = db.query(models.Product).filter(models.Product.stars == 5).count()

    # Zwracamy słownik z listą produktów i liczbą produktów
    result = {"products": products, "count": count}

    return result


#pobieranie produktów po id
@router.get("/{id}", response_model=schemas.Product)
def get_product(id: int, db: Session = Depends(get_db)):

    product = db.query(models.Product).filter(models.Product.id == id).first()

    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= f"product of id {id} desn't exist")
    
    return product


#dodawanie produktów
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Product)
def create_product(product: schemas.ProductAdd, db: Session = Depends(get_db), current_user:int = Depends(oauth2.get_current_user)):

    existing_product = db.query(models.Product).filter(models.Product.name == product.name).first()
    if existing_product:
        raise HTTPException(status_code=400, detail="Product with this name already exists")
    
    new_product = models.Product(**product.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

#usuwanie produktów
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(id: int, db: Session = Depends(get_db), current_user:int = Depends(oauth2.get_current_user)):

    product_query = db.query(models.Product).filter(models.Product.id == id)

    product = product_query.first()

    if product == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= f"product of id {id} desn't exist")
       
    product_query.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


#updatowanie produktów
@router.put("/{id}", status_code=status.HTTP_200_OK, response_model= schemas.Product)
def update_product(id: int, updated_product: schemas.ProductAdd, db: Session = Depends(get_db), current_user:int = Depends(oauth2.get_current_user)):

    product_query = db.query(models.Product).filter(models.Product.id == id)

    product = product_query.first()

    if product == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= f"product of id {id} desn't exist")

    product_query.update(updated_product.dict(), synchronize_session=False)
    
    db.commit()

    return product_query.first()

