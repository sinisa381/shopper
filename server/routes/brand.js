const router = require('express').Router()
const { Brand } = require('../models/brand')
const { auth } = require('../middleware/auth')
const { admin } = require('../middleware/admin')

router.post('/brand', auth, admin, (req, res) => {
  const brand = new Brand(req.body)
  brand.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err })
    res.status(200).json({ success: true, brand: doc })
  })
})

router.get('/brands', (req, res) => {
  Brand.find({}, (err, doc) => {
    if (err) return res.status(400).json({ success: false, err })
    res.status(200).json({
      success: true,
      brand: doc
    })
  })
})

module.exports = router
