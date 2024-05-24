const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const adRoutes = require('./routes/adRoutes')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const propertyRequestRoutes = require('./routes/propertyRequestRoutes')

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(adRoutes)
app.use(authRoutes)
app.use(propertyRequestRoutes)
app.use(adminRoutes)

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.get('/', (req, res) => console.log('Home page'))

module.exports = app
