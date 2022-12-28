import { Router } from "express";
import formidableMiddleware from 'express-formidable';
import { countProducts, createProduct, deleteProduct, getFilteredProducts, getPhoto, getProduct, getProducts, searchProducts, updateProduct } from "../controllers/product";
import { isAdmin, isLoggedIn } from "../middleware/user";
import { runValidation } from "../validations/index";


const productRoute = Router();

 
productRoute.post("/products",isLoggedIn,isAdmin, formidableMiddleware(),createProduct)
productRoute.get("/products/photo/:productId", formidableMiddleware(), getPhoto)
productRoute.get("/products",formidableMiddleware(), getProducts)
productRoute.get("/products/:slug", getProduct)
productRoute.post("/filtered-products", getFilteredProducts)
productRoute.delete("/products/:productId",isLoggedIn, isAdmin, deleteProduct)
productRoute.put("/products/:productId",isLoggedIn, isAdmin,formidableMiddleware(), updateProduct)
productRoute.get("/products-count", countProducts)
productRoute.get("/products/search/:searchValue", searchProducts)


export default productRoute;
