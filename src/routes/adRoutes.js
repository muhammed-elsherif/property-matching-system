import { Router } from 'express'
const router = Router()
import { authenticate, authorize } from '../middleware/auth.js'

import { createAd } from '../controllers/adController.js'
import { matchRequests } from '../controllers/matchController.js'

router
  .post('/ads', authenticate, authorize('AGENT'), createAd)
  .get('/ads/:adId/match', authenticate, authorize('AGENT'), matchRequests)

export default router
