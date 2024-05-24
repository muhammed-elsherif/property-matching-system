const mongoose = require('mongoose')

const adSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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

module.exports = mongoose.model('Ad', adSchema)
