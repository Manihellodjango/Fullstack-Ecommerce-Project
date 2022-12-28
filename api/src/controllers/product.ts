import express, { Request, Response } from 'express'
import Product from '../models/product'
import slugify from 'slugify'
import fs from 'fs'

export const createProduct = async (req: Request , res: Response) => {
  try {
    //@ts-ignore
    const { name, description, price, quantity, shipping, category } = req.fields 
    //@ts-ignore
    const { photo } = req.files 

    if (!name || !description || !price || !quantity || !category) {
      return res.status(400).json({
        message: 'name,description,price,quantity is required',
      })
    }

    if (photo && photo.size > 2000000) {
      return res.status(400).json({
        message: 'the size of the photo is very big',
      })
    }

    // create the product without photo
    const newProduct = new Product({
      name,
      slug: slugify(name),
      description,
      price,
      quantity,
      shipping,
      category,
    })

    // create the product with photo
    if (photo) {
      //@ts-ignore
      newProduct.photo.data = fs.readFileSync(photo.path)
      //@ts-ignore
      newProduct.photo.contentType = photo.type 
    }
    await newProduct.save()
    return res.status(201).json({
      message: 'product was created',
      createProduct,
    })
  } catch (error: any) {
    res.json({
      message: error.message,
    })
  }
}

// get all the products

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { page = ['1'], limit = ['3'] } = req.query as {
      page: string[]
      limit: string[]
    }
    const pageNum = parseInt(page[0], 10)
    const limitNum = parseInt(limit[0], 10)
    const products = await Product.find()
      .populate('category')
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum)
    return res.status(200).json({
      message: 'all products was returned',
      products,
    })
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    })
  }
}

// searcch the products

export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { searchValue } = req.params
    const products = await Product.find({
      $or: [
        { name: { $regex: searchValue, $options: 'i' } },
        { description: { $regex: searchValue, $options: 'i' } },
      ],
    })
    return res.status(200).json(products)
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    })
  }
}

// get the single product

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('category')
      .sort({ createdAt: -1 })
    return res.status(200).json({
      message: 'single product was returned',
      product,
    })
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    })
  }
}
// get the filtered product

export const getFilteredProducts = async (req: Request, res: Response) => {
  try {
    const { checkedCategories, checkedPrice } = req.body

    let args: any = {}
    if (checkedCategories.length > 0) {
      args.category = checkedCategories
    }
    if (checkedPrice.length) {
      args.price = { $gte: checkedPrice[0], $lte: checkedPrice[1] }
    }
    const products = await Product.find(args).select('-photo')
    res.status(200).json(products)
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    })
  }
}

// count products

export const countProducts = async (req: Request, res: Response) => {
  try {
    const numberOfProducts = await Product.find({}).countDocuments()
    return res.status(200).json(numberOfProducts)
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    })
  }
}

// get a photo

export const getPhoto = async (req: Request, res: Response) => {
  try {
    const product: any = await Product.findById(req.params.productId).select(
      'photo'
    )
    if (product.photo.data) {
      res.set('content-Type', product.photo.contentType)
      return res.send(product.photo.data)
    }
    return res.status(201).json({
      message: 'single product was returned',
      product,
    })
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    })
  }
}

// delete the product

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId)
    return res.status(201).json({
      message: 'single product was deleted',
      product,
    })
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    })
  }
}

// update the product

export const updateProduct = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { name, description, price, quantity, shipping, category } =
      req.fields
    //@ts-ignore
    const { photo } = req.files

    if (!name || !description || !price || !quantity || !category) {
      return res.status(400).json({
        message: 'name,description,price,quantity is required',
      })
    }
    if (photo && photo.size > 1000000) {
      return res.status(400).json({
        message: 'the size of the photo is very big',
      })
    }
    // create the product without photo
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        name,
        slug: slugify(name),
        description,
        price,
        quantity,
        shipping,
        category,
      },
      { new: true }
    )
    // create the product with photo
    if (photo) {
      //@ts-ignore
      updatedProduct.photo.data = fs.readFileSync(photo.path)
      //@ts-ignore
      updatedProduct.photo.contentType = photo.type
    }
    //@ts-ignore
    await updatedProduct.save()
    return res.status(201).json({
      message: 'product was updated',
      updatedProduct,
    })
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    })
  }
}
