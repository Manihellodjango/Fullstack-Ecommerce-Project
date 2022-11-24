import { Request, Response, NextFunction, RequestHandler } from 'express'
import User from '../models/User'
import { securePassword, decryptPassword } from '../helpers/hashPassword'
import { errorRes, successRes } from '../helpers/resHelper'

// registerUser (POST)
export const registerUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password, phone } = req.body
    if (!name || !email || !password || !phone) {
      return errorRes(res, 400, 'must provide all fields')
    }
    if (password.length < 8) {
      return errorRes(res, 400, 'password must be at least 8 characters long')
    }
    //check if email already registered:
    const foundUser = await User.findOne({ email: email })
    if (foundUser) {
      return errorRes(res, 400, 'User with this email address already exists')
    }
    // hash the password
    const hashPassword = await securePassword(password)
    console.log(hashPassword)
    // creating the user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      phone,
    })
    // saving data in database
    const UserData = await newUser.save()
    if (!UserData) return errorRes(res, 400, 'user was not created')
    const userInfo = {
      id: UserData._id,
      name: UserData.name,
    }
    successRes(res, 201, 'user was created', userInfo)
  } catch (error) {
    res.status(500).send({
      message: 'error message for user',
    })
  }
}
