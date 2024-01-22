from fastapi import Response, status, HTTPException, Depends, APIRouter, Response
from sqlalchemy.orm import Session
from sqlalchemy import func
from .. database import get_db
from .. import models, schemas, oauth2
from typing import List, Optional

router = APIRouter(
    prefix="/posts",
    tags=['Posts']
)


#pobieranie postów
@router.get("/", response_model= List[schemas.PostOut])
def get_post(db: Session = Depends(get_db), current_user:int = Depends(oauth2.get_current_user), limit: int = 10000, skip: int = 0, search: Optional[str]= ""):

    results = db.query(models.Post, func.count(models.Vote.post_id).label("votes")).join(models.Vote, models.Vote.post_id == models.Post.id, isouter=True).group_by(models.Post.id).filter(models.Post.title.contains(search)).limit(limit).offset(skip).all()

    return results


#dodawanie postów
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Post)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db), current_user:int = Depends(oauth2.get_current_user)):
   
    new_post = models.Post(owner_id = current_user.id, **post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post


#pobieranie postów po id
@router.get("/{id}", response_model=schemas.PostOut)
def get_post(id: int, db: Session = Depends(get_db), current_user:int = Depends(oauth2.get_current_user)):

    post = db.query(models.Post).filter(models.Post.id == id).first()

    result = db.query(models.Post, func.count(models.Vote.post_id).label("votes")).join(models.Vote, models.Vote.post_id == models.Post.id, isouter=True).group_by(models.Post.id).filter(models.Post.id == id).first()

    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= f"post of id {id} desn't exist")
    
    return result


#usuwanie postów 
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int, db: Session = Depends(get_db), current_user:int = Depends(oauth2.get_current_user)):

    post_query = db.query(models.Post).filter(models.Post.id == id)

    post = post_query.first()

    if post == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= f"post of id {id} desn't exist")
    
    if post.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail= f"you cant delete someone's else posts")
    
    post_query.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


#updatowanie postów 
@router.put("/{id}", status_code=status.HTTP_200_OK, response_model= schemas.Post)
def update_post(id: int, updated_post: schemas.PostCreate, db: Session = Depends(get_db), current_user:int = Depends(oauth2.get_current_user)):
    
    post_query = db.query(models.Post).filter(models.Post.id == id)

    post = post_query.first()

    if post == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= f"post of id {id} desn't exist")
    
    if post.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail= f"you cant edit someone's else posts")
    
    post_query.update(updated_post.dict(), synchronize_session=False)
    
    db.commit()

    return post_query.first()