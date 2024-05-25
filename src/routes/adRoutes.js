import { Router } from 'express'
const router = Router()
import { authenticate, authorize } from '../middleware/auth.js'

import { createAd, matchRequests } from '../controllers/adController.js'

router
  .post('/ads', authenticate, authorize('AGENT'), createAd)
  .get('/ads/:adId/match', authenticate, authorize('AGENT'), matchRequests)

export default router
