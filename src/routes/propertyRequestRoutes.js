import { Router } from 'express'
const router = Router()
import { authenticate, authorize } from '../middleware/auth.js'

import { createRequest, updateRequest } from '../controllers/propertyRequestController.js'

router
  .post('/requests', authenticate, authorize('CLIENT'), createRequest)
  .patch('/requests/:id', authenticate, authorize('CLIENT'), updateRequest)

export default router
