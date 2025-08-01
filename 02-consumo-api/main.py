from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Habilitar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos de datos
class Product(BaseModel):
    id: int
    name: str
    price: float
    description: str

class ProductCreate(BaseModel):
    name: str
    price: float
    description: str

# Base de datos en memoria
products: List[Product] = []
next_id = 1  # contador de IDs

@app.get("/api/products", response_model=List[Product])
def get_products():
    return products

@app.post("/api/products", response_model=Product)
def create_product(prod: ProductCreate):
    global next_id
    new_product = Product(id=next_id, **prod.dict())
    products.append(new_product)
    next_id += 1
    return new_product

@app.get("/api/products/{product_id}", response_model=Product)
def get_product(product_id: int):
    for prod in products:
        if prod.id == product_id:
            return prod
    raise HTTPException(status_code=404, detail="Producto no encontrado")

@app.delete("/api/products/{product_id}")
def delete_product(product_id: int):
    global products
    products = [prod for prod in products if prod.id != product_id]
    return {"message": "Producto eliminado"}
