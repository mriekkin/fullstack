const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const testBlogs = require('./testBlogs')

beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = testBlogs.blogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('API tests for GET', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')

    expect(response.body.length).toBe(6)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api
      .get('/api/blogs')

    const titles = response.body.map(blog => blog.title)

    expect(titles).toContain('First class tests')
  })
})

describe('API tests for POST', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Example blog',
      author: 'John Doe',
      url: 'http://blog.example.com/',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')

    const titles = response.body.map(blog => blog.title)

    expect(titles.length).toBe(testBlogs.blogs.length + 1)
    expect(titles).toContain('Example blog')
  })
})

afterAll(() => {
  server.close()
})