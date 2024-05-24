const express = require('express')
const router = express.Router()
const { authenticate, authorize } = require('../middleware/auth')

const { getAdminStats } = require('../controllers/adminController')

router.get('/admin/stats', authenticate, authorize('ADMIN'), getAdminStats)

module.exports = router
