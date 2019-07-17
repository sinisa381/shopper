const router = require('express').Router()
const { Wood } = require('../models/wood')
const { auth } = require('../middleware/auth')
const { admin } = require('../middleware/admin')

router.post('/wood', auth, admin, (req, res) => {
	const wood = new Wood(req.body)
	wood.save((err, doc) => {
		if (err) return res.status(400).json({ success: false, err })
		res.status(200).json({ success: true, wood: doc })
	})
})

router.get('/woods', (req, res) => {
	Wood.find({}, (err, doc) => {
		if (err) return res.status(400).json({ success: false, err })
		res.status(200).json({
			success: true,
			wood: doc
		})
	})
})

module.exports = router
