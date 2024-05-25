import { Schema, model } from 'mongoose'

const propertyRequestSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    propertyType: { type: String, enum: ['VILLA', 'HOUSE', 'LAND', 'APARTMENT'], required: true },
    area: { type: Number, required: true },
    price: { type: Number, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    description: { type: String },
    refreshedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

export default model('PropertyRequest', propertyRequestSchema)
