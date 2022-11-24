import express from 'express'
import { registerUser } from '../controllers/user.controller'
import { registerUserValidaton } from '../validators/user.validator'

const userRoute = express.Router()

userRoute.post('/register', registerUserValidaton, registerUser)

export default userRoute
