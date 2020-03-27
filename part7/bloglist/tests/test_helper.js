const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
    {
        title: 'Apartment',
        author: 'Loc Hoang',
        url: 'http://api.test',
        likes: 10
    },
    {
        title: 'House',
        author: 'RyuuVN',
        url: 'http://fullstack.test',
        likes: 20
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  
  module.exports = {
    initialBlogs, blogsInDb, usersInDb
  }