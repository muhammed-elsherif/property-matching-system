import PropertyRequest from '../models/PropertyRequest.js'

export async function createRequest(req, res) {
  try {
    const request = new PropertyRequest({
      ...req.body,
      userId: req.user._id
    })
    await request.save()
    res.status(201).send(request)
  } catch (error) {
    res.status(400).send(error)
  }
}

// Update Property Request
export async function updateRequest(req, res) {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'area', 'price']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const request = await PropertyRequest.findOne({ _id: req.params.id, userId: req.user._id })

    if (!request) {
      return res.status(404).send()
    }

    updates.forEach((update) => (request[update] = req.body[update]))
    await request.save()
    res.send(request)
  } catch (e) {
    res.status(400).send(e)
  }
}
