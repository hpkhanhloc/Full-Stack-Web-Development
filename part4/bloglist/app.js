const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const Blog = require('./models/blog')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true})
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(() => {
        console.log('error connection to MongoDB')
    })
app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

module.exports = app