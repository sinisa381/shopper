const mongoose = require('mongoose')

const brandSchema = mongoose.Schema({
	name: {
		required: true,
		unique: 1,
		type: String,
		maxlength: 100
	}
})

const Brand = mongoose.model('Brand', brandSchema)

module.exports = { Brand }
