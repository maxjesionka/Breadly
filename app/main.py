from fastapi import FastAPI
from .routers import post, user, authentication, vote, product, order
from fastapi.middleware.cors import CORSMiddleware
from . import models
from . database import engine
from .config import settings


#models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(post.router)
app.include_router(user.router)
app.include_router(authentication.router)
app.include_router(vote.router)
app.include_router(product.router)
app.include_router(order.router)

#root
@app.get("/")
def root():
    return {"message":"welcome to Breadly"}



