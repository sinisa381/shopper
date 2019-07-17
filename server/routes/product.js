const router = require('express').Router()
const mongoose = require('mongoose')
const { Product } = require('../models/product')
const { auth } = require('../middleware/auth')
const { admin } = require('../middleware/admin')

router.post('/article', auth, admin, (req, res) => {
	const product = new Product(req.body)
	product.save((err, doc) => {
		if (err) return res.status(400).json({ success: false, err })
		res.status(200).json({ success: true, article: doc })
	})
})

//article?id=1nkjnkj,asdasd,aaljdlaksjd&type=array
router.get('/article_by_id', (req, res) => {
	let type = req.query.type
	let items = req.query.id
	if (type === 'array') {
		let ids = req.query.id.split(',')
		items = []
		items = ids.map(item => {
			return mongoose.Types.ObjectId(item)
		})
	}
	//$in takes 1 item or array
	// populate must take lowercase
	Product.find({ _id: { $in: items } })
		.populate('wood')
		.populate('brand')
		.exec((err, docs) => {
			if (err) return res.status(400).json({ success: false, err })
			res.status(200).json({ success: true, article: docs })
		})
})

//BY ARRIVAl
//article?sortBy=createdAt&order=desc&limit=4
//BY SELL
//article?sortBy=sold&order=desc&limit=4
router.get('/articles', (req, res) => {
	let order = req.query.order ? req.query.order : 'asc'
	let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
	let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 100

	Product.find()
		.populate('brand')
		.populate('wood')
		.sort([ [ sortBy, order ] ])
		.limit(limit)
		.exec((err, article) => {
			if (err) return status(400).json({ success: false, err })
			res.status(200).json({ success: true, article })
		})
})

router.post('/shop', (req, res) => {
	let order = req.body.order ? req.body.order : 'desc'
	let sortBy = req.body.sortBy ? req.body.sortBy : '_id'
	let limit = req.body.limit ? parseInt(req.body.limit) : 100
	let skip = req.body.skip

	let findArgs = {}
	for (let key in req.body.filters) {
		if (req.body.filters[key].length > 0) {
			if (key === 'price') {
				findArgs[key] = {
					$gte: req.body.filters[key][0],
					$lte: req.body.filters[key][1]
				}
			} else {
				findArgs[key] = req.body.filters[key]
			}
		}
	}
	Product.find(findArgs)
		.populate('wood')
		.populate('brand')
		.sort([ [ sortBy, order ] ])
		.skip(skip)
		.limit(limit)
		.exec((err, articles) => {
			if (err) return status(400).json({ success: false, err })
			res.status(200).json({ articles, size: articles.length })
		})
})

module.exports = router
