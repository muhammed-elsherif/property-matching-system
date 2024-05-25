import User from '../models/User.js';

export default async function getAdminStats(req, res) {
  const { page = 1, limit = 10 } = req.query
  try {
    const stats = await User.aggregate([
      { $match: { role: { $in: ['CLIENT', 'AGENT'] } } },
      {
        $lookup: {
          from: 'ads',
          localField: '_id',
          foreignField: 'userId',
          as: 'ads'
        }
      },
      {
        $lookup: {
          from: 'propertyrequests',
          localField: '_id',
          foreignField: 'userId',
          as: 'requests'
        }
      },
      {
        $project: {
          name: 1,
          phone: 1,
          role: 1,
          status: 1,
          adsCount: { $size: '$ads' },
          totalAdsAmount: { $sum: '$ads.price' },
          requestsCount: { $size: '$requests' },
          totalRequestsAmount: { $sum: '$requests.price' }
        }
      },
      { $skip: (page - 1) * parseInt(limit) },
      { $limit: parseInt(limit) }
    ])

    const total = await User.countDocuments()

    res.send({
      data: stats,
      page,
      limit,
      total,
      hasNextPage: page * limit < total,
      hasPreviousPage: page > 1
    })
  } catch (e) {
    res.status(500).send(e)
  }
}
