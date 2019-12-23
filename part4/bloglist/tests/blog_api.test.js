const mongoose = require('mongoose')
const suppertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = suppertest(app)

beforeEach(async () =>{
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('there is id property to be an identifier', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.map(r => r.id)).toBeDefined()
})

test('a valid blog can be added', async () =>{
    const newBlog = {
        title: 'Test API',
        author: 'Loc Hoang',
        url: 'http://backend.test',
        userId: '5e00e458872f0b4d4cd46a38',
        likes: '1'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const finnalblogs = await helper.blogsInDb()

    const titles = finnalblogs.map(r => r.title)

    expect(finnalblogs.length).toBe(helper.initialBlogs.length + 1)
    expect(titles).toContain('Test API')
})

test('blog without likes is set as default 0', async() =>{
    const newBlog = {
        title: 'Test API',
        author: 'Loc Hoang',
        userId: '5e00e458872f0b4d4cd46a38',
        url: 'http://backend.test'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const finnalblogs = await helper.blogsInDb()
    const likes = finnalblogs.map(r => r.likes)
    expect(likes[2]).toBe(0)
})

test('blog without title and url is not added', async() =>{
    const newBlog = {
        author: 'Loc Hoang',
        userId: '5e00e458872f0b4d4cd46a38',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const finnalblogs = await helper.blogsInDb()

    expect(finnalblogs.length).toBe(helper.initialBlogs.length)
})

test('a blog can be deleted', async () =>{
    const blogAtStart = await helper.blogsInDb()
    const blogBeDelete = blogAtStart[0]

    await api
        .delete(`/api/blogs/${blogBeDelete.id}`)
        .expect(204)


    const blogAtEnd = await helper.blogsInDb()
    expect(blogAtEnd.length).toBe(helper.initialBlogs.length-1)

    const titles = blogAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogBeDelete.title)
})

test('update likes of a blog', async () =>{
    const blogAtStart = await helper.blogsInDb()
    const blogBeUpdated = blogAtStart[0]
    const blog = {
        title: blogBeUpdated.title,
        author: blogBeUpdated.author,
        url: blogBeUpdated.url,
        likes: 100
    }

    await api
        .put(`/api/blogs/${blogBeUpdated.id}`)
        .send(blog)

    const blogAtEnd = await helper.blogsInDb()
    expect(blogAtEnd.length).toBe(helper.initialBlogs.length)

    const likes = blogAtEnd.map(r => r.likes)
    expect(likes[0]).toBe(100)
})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      const user = new User({ username: 'root', password: 'secret' })
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'hphanhloc',
        name: 'Loc Hoang',
        password: 'fullstack',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('`username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
    
  })

afterAll(() => {
    mongoose.connection.close()
})

