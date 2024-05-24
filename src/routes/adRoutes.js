const express = require('express')
const router = express.Router()
const { authenticate, authorize } = require('../middleware/auth')

const { createAd, matchRequests } = require('../controllers/adController')

router
  .post('/ads', authenticate, authorize('AGENT'), createAd)
  .get('/ads/:adId/match', authenticate, authorize('AGENT'), matchRequests)

module.exports = router
