import mongoose from 'mongoose'
import { config } from 'dotenv'

import User from '../models/User.js'
import users from './user.js'

config()

export default async function loadData() {
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
