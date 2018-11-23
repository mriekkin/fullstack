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
      likes: 5
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

  test('the field likes has a default value of 0', async () => {
    const newBlog = {
      title: 'A blog with no likes',
      author: 'John Doe',
      url: 'http://obscure.example.com/'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')

    const r = response.body.find(blog => blog.title === 'A blog with no likes')

    expect(r.likes).toBe(0)
  })

  test('a blog without a title is not added', async () => {
    const newBlog = {
      author: 'John Doe',
      url: 'http://notitle.example.com/',
      likes: '1'
    }

    const initialBlogs = await api
      .get('/api/blogs')

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api
      .get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.body.length)
  })

  test('a blog without an URL is not added', async () => {
    const newBlog = {
      title: 'A blog without an URL',
      author: 'John Doe',
      likes: '1'
    }

    const initialBlogs = await api
      .get('/api/blogs')

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api
      .get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.body.length)
  })
})

afterAll(() => {
  server.close()
})