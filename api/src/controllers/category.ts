import express, {Request, Response} from 'express';
import slugify from "slugify";
import Category from "../models/category";

// create category
export const createCategory = async (req:Request, res:Response) => {
  try {
    const { name } = req.body;
    const exsitingCategory = await Category.findOne({ name });
    if (exsitingCategory) {
      return res
        .status(400)
        .json({ error: "category already exit with this name" });
    }

    const newCategory = await new Category({
      name,
      slug: slugify(name),
    });
    await newCategory.save();
    return res.status(200).json({
      message: "Category was created",
      newCategory,
    });
  } catch (error:any) {
    return res.json({
      message: error.message
    });
  }
};

// update category

export const updateCategory = async (req:Request, res:Response) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const exsitingCategory = await Category.findById({ _id: categoryId });
    if (!exsitingCategory) {
      return res
        .status(400)
        .json({ error: "category doesnot exist with this id" });
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: categoryId },
      { name, slug: slugify(name) },
      { new: true }
    );
    return res
      .status(400)
      .json({ error: "category was updated", updatedCategory });
  } catch (error:any) {
    return res.json({
      error: error.message,
    });
  }
};

// delete category

export const deleteCategory = async (req:Request, res:Response) => {
  try {
    const { categoryId } = req.params;
    const exsitingCategory = await Category.findById({ _id: categoryId });
    if (!exsitingCategory) {
      return res
        .status(400)
        .json({ error: "category doesnot exist with this id" });
    }
    const deletedCategory = await Category.findByIdAndDelete({
      _id: categoryId,
    });
    return res
      .status(400)
      .json({ error: "category was deleted", deletedCategory });
  } catch (error:any) {
    return res.json({
      error: error.message,
    });
  }
};

// get category
export const getCategory = async (req:Request, res:Response) => {
  try {
    const { slug } = req.params;
    const singleCategory = await Category.findOne({ slug });
    if (!singleCategory) {
      return res
        .status(400)
        .json({ error: "category doesnot exist with this slug" });
    }
    return res
      .status(200)
      .json({ message: "single category was returned", singleCategory });
  } catch (error:any) {
    return res.json({
      error: error.message,
    });
  }
};

// get categories
export const getCategories = async (req:Request, res:Response) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(400).json({ error: "category not found" });
    }
    return res
      .status(200)
      .json({ message: "categories was returned", categories });
  } catch (error:any) {
    return res.json({
      error: error.message,
    });
  }
};
