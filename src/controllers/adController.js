import Ad from '../models/Ad.js'

export async function createAd(req, res) {
  try {
    const ad = new Ad({ ...req.body, userId: req.user._id })
    await ad.save()
    res.status(201).send(ad)
  } catch (error) {
    res.status(400).send(error)
  }
}

import PropertyRequest from '../models/PropertyRequest.js'

export async function matchRequests(req, res) {
  try {
    const { adId } = req.params
    const { page = 1, limit = 10 } = req.query
    const ad = await Ad.findById(adId)
    if (!ad) {
      return res.status(404).send({ message: 'Ad not found' })
    }

    const { district, area, price } = ad
    const minPrice = price * 0.9
    const maxPrice = price * 1.1

    const matches = await PropertyRequest.aggregate([
      {
        $match: {
          district,
          area: { $gte: area - 10, $lte: area + 10 },
          price: { $gte: minPrice, $lte: maxPrice }
        }
      },
      { $sort: { refreshedAt: -1 } },
      { $skip: (page - 1) * parseInt(limit) },
      { $limit: parseInt(limit) }
    ])
    const totalMatches = await PropertyRequest.countDocuments({
      district,
      area: { $gte: area - 10, $lte: area + 10 },
      price: { $gte: minPrice, $lte: maxPrice }
    })

    res.send({
      data: matches,
      page,
      limit,
      total: totalMatches,
      hasNextPage: page * limit < totalMatches,
      hasPreviousPage: page > 1
    })
  } catch (error) {
    res.status(500).send(error)
  }
}
