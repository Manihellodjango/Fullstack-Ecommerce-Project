import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'

const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
// import session from 'express-session'
// import cookieParser from 'cookie-parser'
// import passport from 'passport'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import movieRouter from './routers/movie.router'
import productRouter from './routers/product.router'
import userRouter from './routers/user.router'

dotenv.config({ path: '.env' })
const app = express()

// api documentation
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      version: '1.0.0',
      description: 'A complete REST API for products',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['./src/routers/*.ts'],
}

const openapiSpecification = swaggerJsdoc(options)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

// Express configuration
app.set('port', process.env.PORT)

// Global middleware
app.use(
  cors({
    origin: '*',
  })
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(apiContentType)
app.use(morgan('dev'))

/** using passport also requires to ass session and cookieParser middlewares to express
 * To be activated later
app.use(cookieParser())
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 60 * 60 * 24,
    },
    secret: 'secret',
  })
)
app.use(passport.initialize())
app.use(passport.session())
*/

// Set up routers
app.use('/api/v1/movies', movieRouter)
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
