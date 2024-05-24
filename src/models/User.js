const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
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
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

module.exports = mongoose.model('User', userSchema)
