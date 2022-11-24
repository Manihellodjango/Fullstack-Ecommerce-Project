import express from 'express'
const { upload } = require('../middlewares/fileUpload')

import {
  createProduct,
  findById,
  deleteProduct,
  findAll,
  updateProduct,
} from '../controllers/product.controller'

const router = express.Router()

// create a schema
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *         type: object
 *         required:
 *           - id
 *           - name
 *           - description
 *           - brand
 *           - price
 *           - category
 *           - image
 *           - rating
 *         properties:
 *            id:
 *               type: number
 *               description: Id of the product
 *            name:
 *               type: string
 *               description: Name of the product
 *            description:
 *               type: string
 *               description: description of the product
 *            brand:
 *               type: string
 *               description: brand of the product
 *            price:
 *               type: number
 *               description: price of the product
 *            category:
 *               type: string
 *               description: category of the product
 *            image:
 *               type: string
 *               description: image of the product
 *            rating:
 *               type: number
 *               description: rating of the product
 *         example:
 *          id: 234567
 *          title: iphone 14
 *          description: new features dynamic island
 *          brand: iphone
 *          price: 345
 *          category: phones
 *          image: hello
 *          rating: 4.5
 *
 */

/**
 *  @swagger
 *  /api/products:
 *  get:
 *    summary: Return all the products
 *    tags: [Get All Products ]
 *    responses:
 *      200:
 *        description: all the products
 *        content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Product'
 *      400:
 *        description: server error
 *
 */

router.get('/', findAll)

/**
 *  @swagger
 *  /api/products/{id}:
 *  get:
 *    summary: get a single product with id
 *    parameters:
 *      - in : path
 *        name : id
 *        schema:
 *          type: string
 *        required : true
 *        description : The id of the product
 *    tags: [Get a single Product ]
 *    responses:
 *      200:
 *        description: single product
 *        content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Product'
 *      400:
 *        description: server error
 *
 */

router.get('/:productId', findById)

/**
 *  @swagger
 *  /api/products/{id}:
 *  put:
 *    summary: create a product
 *    parameters:
 *      - in : path
 *        name : id
 *        schema:
 *          type: string
 *        required : true
 *        description : The id of the product
 *    requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *            schema:
 *                $ref: '#/components/schemas/Product'
 *    tags: [ Update Single Product ]
 *    responses:
 *      200:
 *        description: The product was updated
 *      404:
 *        description: The product with id was not found
 *      500:
 *        description: server error
 *
 */

router.put('/:productId', updateProduct)

/**
 *  @swagger
 *  /api/products/{id}:
 *  delete:
 *    summary: delete a single product with id
 *    parameters:
 *      - in : path
 *        name : id
 *        schema:
 *          type: string
 *        required : true
 *        description : The id of the product
 *    tags: [ delete single Product ]
 *    responses:
 *      200:
 *        description: product was deleted
 *
 *      400:
 *        description: server error
 *
 */

router.delete('/:productId', deleteProduct)

/**
 *  @swagger
 *  /api/products:
 *  post:
 *    summary: create a product
 *    requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *            schema:
 *                $ref: '#/components/schemas/Product'
 *    tags: [ Create a Product ]
 *    responses:
 *      201:
 *        description: single product
 *        content:
 *           application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Product'
 *      404:
 *        description: The product with id was not found
 *      500:
 *        description: server error
 *
 */

router.post('/', upload.single('image'), createProduct)

export default router
