const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body
    const user = await User.findOne({ phone })

    // Check if user exists
    if (!user) {
      return res.status(400).send({ error: 'Invalid login credentials' })
    }

    // Matching passwords
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).send({ error: 'Invalid login credentials22' })
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    })

    res.send({ user, token })
  } catch (e) {
    res.status(500).send({ error: 'Internal Server Error' })
  }
}
