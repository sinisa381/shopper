const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
	useFindAndModify: false
})

const userRoutes = require('./routes/user')
const brandRoutes = require('./routes/brand')
const woodRoutes = require('./routes/wood')
const productRoutes = require('./routes/product')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

//users
app.use('/api/users', userRoutes)
app.use('/api/product', brandRoutes)
app.use('/api/product', woodRoutes)
app.use('/api/product', productRoutes)

const port = process.env.PORT || 3004

app.listen(port, () => {
	console.log(`Server running at ${port}`)
})
