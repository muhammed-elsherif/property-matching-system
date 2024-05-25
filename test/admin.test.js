import mongoose from 'mongoose'
import { use, expect } from 'chai'
import chaiHttp from 'chai-http'
const chai = use(chaiHttp)

import { config } from 'dotenv'

import app from '../src/index.js'
import User from '../src/models/User.js'
import Ad from '../src/models/Ad.js'
import PropertyRequest from '../src/models/PropertyRequest.js'

config()

describe('Admin Stats Endpoint', () => {
  let adminToken
  let agentToken

  before(async () => {
    await mongoose.connect(process.env.MONGO_TEST_URI)

    // Clean up the database before tests
    await User.deleteMany({})
    await Ad.deleteMany({})
    await PropertyRequest.deleteMany({})

    // Create test users
    const adminUser = new User({
      name: 'Admin User',
      phone: '9999999999',
      password: 'adminpassword',
      role: 'ADMIN',
      status: 'ACTIVE'
    })
    await adminUser.save()

    const agentUser = new User({
      name: 'Agent User',
      phone: '8888888888',
      password: 'agentpassword',
      role: 'AGENT',
      status: 'ACTIVE'
    })
    await agentUser.save()

    const clientUser = new User({
      name: 'Client User',
      phone: '7777777777',
      password: 'clientpassword',
      role: 'CLIENT',
      status: 'ACTIVE'
    })
    await clientUser.save()

    // Log in the admin user
    let res = await chai
      .request(app)
      .post('/login')
      .send({ phone: '9999999999', password: 'adminpassword' })

    adminToken = res.body.token

    // Log in the agent user
    res = await chai
      .request(app)
      .post('/login')
      .send({ phone: '8888888888', password: 'agentpassword' })

    agentToken = res.body.token

    // Create test ads and property requests
    await Ad.create([
      {
        propertyType: 'APARTMENT',
        area: 120,
        price: 100000,
        city: 'City1',
        district: 'District1',
        description: 'Ad 1',
        userId: agentUser._id
      },
      {
        propertyType: 'VILLA',
        area: 300,
        price: 300000,
        city: 'City2',
        district: 'District2',
        description: 'Ad 2',
        userId: agentUser._id
      }
    ])
    await PropertyRequest.create([
      {
        propertyType: 'HOUSE',
        area: 150,
        price: 150000,
        city: 'City1',
        district: 'District1',
        description: 'Request 1',
        userId: clientUser._id
      },
      {
        propertyType: 'LAND',
        area: 500,
        price: 50000,
        city: 'City2',
        district: 'District2',
        description: 'Request 2',
        userId: clientUser._id
      }
    ])
  })

  after(async () => {
    await mongoose.connection.close()
  })

  it('should get admin stats', async () => {
    const res = await chai
      .request(app)
      .get('/admin/stats')
      .set('Authorization', `Bearer ${adminToken}`)
      .query({ page: 1, limit: 10 })

    expect(res).to.have.status(200)
    expect(res.body).to.have.property('data')
    expect(res.body.data).to.be.an('array')
    expect(res.body.data[0]).to.have.property('name')
    expect(res.body.data[0]).to.have.property('adsCount')
    expect(res.body.data[0]).to.have.property('totalAdsAmount')
    expect(res.body.data[0]).to.have.property('requestsCount')
    expect(res.body.data[0]).to.have.property('totalRequestsAmount')
  })

  it('should return 401 if not authenticated', async () => {
    const res = await chai.request(app).get('/admin/stats')

    expect(res).to.have.status(401)
    expect(res.body).to.have.property('error', 'Please authenticate.')
  })

  it('should return 403 if not authorized', async () => {
    const res = await chai
      .request(app)
      .get('/admin/stats')
      .set('Authorization', `Bearer ${agentToken}`)

    expect(res).to.have.status(403)
    expect(res.body).to.have.property('error', 'Access denied')
  })
})
