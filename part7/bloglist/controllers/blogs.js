const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body

  try {
    const blog = await Blog.findById(request.params.id)
    blog.comments = blog.comments.concat(body.comment)

    await blog.save()
    response.json(blog)
  } catch (exception) {
    next(exception)
  }
})


blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)

    try {
      const decodeToken = jwt.verify(request.token, process.env.SECRET)
      if (!request.token || !decodeToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
      }

      const user = await User.findById(decodeToken.id)

      if(!blog.likes) {
        blog.likes = 0

      }
  
      blog.user = user
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    if (!request.token) {
      return response.status(401).json({ error: 'token missing'})
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findByIdAndRemove(request.params.id)
    if (blog.user.toString() === decodedToken.id) {
      response.status(204).end()
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) =>{
  const blog = request.body
  blog.user = blog.user.id

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true}).populate('user')
    response.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
