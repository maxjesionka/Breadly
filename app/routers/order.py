from fastapi import status, Depends, APIRouter, HTTPException, Response
from sqlalchemy.orm import Session
from .. database import get_db
from typing import List, Optional
from .. import schemas, database, models, oauth2

router = APIRouter(
    prefix="/orders",
    tags=['Orders']
)

#dodawanie zamówienia
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.OrderOut)
def order(order: schemas.OrderAdd, db: Session = Depends(database.get_db), current_user: int = Depends(oauth2.get_current_user)):

    # Create a new order
    new_order = models.Order(owner_id=current_user.id)
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    # Add product details to the order
    order_details = []
    for detail in order.details:
        product_id = detail.product_id
        quantity = detail.quantity
        total_price = detail.total_price

        # Check if there is enough quantity in stock
        product = db.query(models.Product).filter(models.Product.id == product_id).first()
        if product is None or product.stock < quantity:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Brak wymaganej ilości towaru '{product.name}' na stanie")

        # Create Orderdetail instance and associate it with the new order
        order_detail = models.Orderdetail(order_id=new_order.id, product_id=product_id, quantity=quantity, total_price=total_price)
        order_details.append(order_detail)

        # Update product quantity in the "products" table
        db.execute(
            models.Product.__table__.update()
            .where(models.Product.id == product_id)
            .values(stock=models.Product.stock - quantity)
        )

    # Add the order details to the database
    db.add_all(order_details)
    db.commit()

    # Refresh the new_order instance to include the details
    db.refresh(new_order)

    return new_order


#pobieranie wszystkoch zamówień
@router.get("/", response_model= List[schemas.OrderOut] )
def get_orders(db: Session = Depends(get_db), current_user:int = Depends(oauth2.get_current_user), limit: int = 10000, skip: int = 0, search: Optional[str]= ""):
    
    orders = db.query(models.Order).limit(limit).offset(skip).all()

    return orders

#pobieranie swoich zamówień
@router.get("/your", response_model= List[schemas.OrderOut] )
def get_your_orders(db: Session = Depends(get_db), current_user:int = Depends(oauth2.get_current_user), limit: int = 10000, skip: int = 0, search: Optional[str]= ""):
    
    orders = db.query(models.Order).filter(models.Order.owner_id == current_user.id).limit(limit).offset(skip).all()

    return orders