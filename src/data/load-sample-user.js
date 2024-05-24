const mongoose = require('mongoose')
const User = require('../models/User')
const users = require('./user')

async function loadData() {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    // Clear existing users
    await User.deleteMany({})

    // Create users
    for (const user of users) {
      await User.create(user)
    }

    console.log('Database seeded with users!')
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit()
  }
}

loadData()
