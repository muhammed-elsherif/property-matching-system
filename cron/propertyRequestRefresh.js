import { schedule } from 'node-cron'
import PropertyRequest from '../src/models/PropertyRequest.js'

schedule('0 0 */3 * *', async () => {
  await PropertyRequest.updateMany({}, { refreshedAt: new Date() })
})
