const express = require('express')
const router = express.Router()
const { authenticate, authorize } = require('../middleware/auth')

const { createRequest, updateRequest } = require('../controllers/propertyRequestController')

router
  .post('/requests', authenticate, authorize('CLIENT'), createRequest)
  .patch('/requests/:id', authenticate, authorize('CLIENT'), updateRequest)

module.exports = router
