import { Router } from "express";
import { isAdmin, isLoggedIn } from "../middleware/user";
import { runValidation } from "../validations/index";
import { categoryValidator } from "../validations/category";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/category";

const categoryRoute = Router();

// register api Routers
categoryRoute.post(
  "/categories",
  categoryValidator,
  runValidation,
  isLoggedIn,
  isAdmin,
  createCategory
);
categoryRoute.put(
  "/categories/:categoryId",
  categoryValidator,
  runValidation,
  isLoggedIn,
  isAdmin,
  updateCategory
);
categoryRoute.delete(
  "/categories/:categoryId",
  isLoggedIn,
  isAdmin,
  deleteCategory
);
categoryRoute.get("/categories/:slug", categoryValidator, getCategory);
categoryRoute.get("/categories", categoryValidator, getCategories);

export default categoryRoute;
