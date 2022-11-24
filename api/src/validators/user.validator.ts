import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator'

export const registerUserValidaton = [
  check('name').notEmpty().withMessage('Must provide name.'),
  check('email')
    .notEmpty()
    .normalizeEmail()
    .isEmail()
    .withMessage('Not a valid email address.'),
  check('password')
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters.'),
  check('phone').notEmpty().withMessage('Must provide phone number.'),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const validationErrors: string[] = errors
        .array()
        .map((error) => error.msg)
      return res.status(404).json({
        validationErrors,
      })
    }
    return next()
  },
]
