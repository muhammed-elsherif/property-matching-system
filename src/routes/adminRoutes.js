import { Router } from 'express'
const router = Router()
import { authenticate, authorize } from '../middleware/auth.js'

import getAdminStats from '../controllers/adminController.js'

router.get('/admin/stats', authenticate, authorize('ADMIN'), getAdminStats)

export default router
