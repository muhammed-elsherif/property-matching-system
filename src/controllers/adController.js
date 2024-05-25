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
