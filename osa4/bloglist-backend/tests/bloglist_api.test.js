const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const testBlogs = require('./testBlogs')

describe('getting a list of blogs (API tests)', () => {
  beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = testBlogs.blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned as json by GET /api/blogs', async () => {
    const blogsInDatabase = await helper.blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDatabase.length)

    const returnedTitles = response.body.map(blog => blog.title)

    blogsInDatabase.forEach(blog => {
      expect(returnedTitles).toContain(blog.title)
    })
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api
      .get('/api/blogs')

    const titles = response.body.map(blog => blog.title)

    expect(titles).toContain('First class tests')
  })
})

describe('adding a blog (API tests)', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Example blog',
      author: 'John Doe',
      url: 'http://blog.example.com/',
      likes: 5
    }

    const blogsBefore = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    let blogsAfter = await helper.blogsInDb()

    blogsAfter = blogsAfter.map(helper.dropId)

    expect(blogsAfter.length).toBe(blogsBefore.length + 1)
    expect(blogsAfter).toContainEqual(newBlog)
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

    const blogsAfter = await helper.blogsInDb()

    const r = blogsAfter.find(blog => blog.title === 'A blog with no likes')

    expect(r.likes).toBe(0)
  })

  test('a blog without a title is not added', async () => {
    const newBlog = {
      author: 'John Doe',
      url: 'http://notitle.example.com/',
      likes: '1'
    }

    const blogsBefore = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfter = await helper.blogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length)
  })

  test('a blog without an URL is not added', async () => {
    const newBlog = {
      title: 'A blog without an URL',
      author: 'John Doe',
      likes: '1'
    }

    const blogsBefore = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfter = await helper.blogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length)
  })
})

describe('deletion of a blog (API tests)', async () => {
  let addedBlog

  beforeAll(async () => {
    addedBlog = new Blog({
      title: 'A blog to be removed with HTTP DELETE',
      author: 'John Doe',
      url: 'http://delete.example.com',
      likes: 1
    })
    await addedBlog.save()
  })

  test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
    const blogsAtStart = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${addedBlog._id}`)
      .expect(204)

    const blogsAfter = await helper.blogsInDb()

    const titles = blogsAfter.map(blog => blog.title)

    expect(titles).not.toContain(addedBlog.title)
    expect(blogsAfter.length).toBe(blogsAtStart.length - 1)
  })
})

afterAll(() => {
  server.close()
})