// middleware/auth.js
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: decoded._id })

    if (!user) {
      throw new Error()
    }

    req.user = user
    next()
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' })
  }
}

export const authorize = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).send({ error: 'Access denied' })
  }
  next()
}
