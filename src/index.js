import express, { json } from 'express'
import connectDB from '../config/dbConfig.js'

import adRoutes from './routes/adRoutes.js'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import propertyRequestRoutes from './routes/propertyRequestRoutes.js'

import loadData from './data/load-sample-user.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(json())
app.use(adRoutes)
app.use(authRoutes)
app.use(propertyRequestRoutes)
app.use(adminRoutes)

// loadData()

connectDB()

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.get('/', (req, res) => console.log('Home page'))

export default app
