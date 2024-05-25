import { Schema, model } from 'mongoose'
import pkg from 'bcryptjs'
const { genSalt, hash } = pkg

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['ADMIN', 'CLIENT', 'AGENT'], required: true },
    status: { type: String, enum: ['ACTIVE', 'DELETED'], default: 'ACTIVE' }
  },
  { timestamps: true }
)

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await genSalt()
  this.password = await hash(this.password, salt)
  next()
})

export default model('User', userSchema)
