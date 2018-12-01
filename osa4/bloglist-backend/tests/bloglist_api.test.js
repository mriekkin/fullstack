const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { dropId, nonExistingId, blogsInDb, usersInDb } = require('./test_helper')
const testBlogs = require('./testBlogs')

describe('when there are initially a few blogs in the db', () => {
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
    const blogsInDatabase = await blogsInDb()

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

describe('adding a blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Example blog',
      author: 'John Doe',
      url: 'http://blog.example.com/',
      likes: 5
    }

    const blogsBefore = await blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    let blogsAfter = await blogsInDb()

    blogsAfter = blogsAfter.map(dropId)

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

    const blogsAfter = await blogsInDb()

    const r = blogsAfter.find(blog => blog.title === 'A blog with no likes')

    expect(r.likes).toBe(0)
  })

  test('a blog without a title is not added', async () => {
    const newBlog = {
      author: 'John Doe',
      url: 'http://notitle.example.com/',
      likes: '1'
    }

    const blogsBefore = await blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfter = await blogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length)
  })

  test('a blog without an URL is not added', async () => {
    const newBlog = {
      title: 'A blog without an URL',
      author: 'John Doe',
      likes: '1'
    }

    const blogsBefore = await blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfter = await blogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length)
  })
})

describe('deletion of a blog', async () => {
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
    const blogsAtStart = await blogsInDb()

    await api
      .delete(`/api/blogs/${addedBlog._id}`)
      .expect(204)

    const blogsAfter = await blogsInDb()

    const titles = blogsAfter.map(blog => blog.title)

    expect(titles).not.toContain(addedBlog.title)
    expect(blogsAfter.length).toBe(blogsAtStart.length - 1)
  })
})

describe('updating of a blog', async () => {
  let addedBlog
  let updatedBlog

  beforeAll(async () => {
    addedBlog = new Blog({
      title: 'A blog to be updated with HTTP PUT',
      author: 'John Doe',
      url: 'http://update.example.com',
      likes: 1
    })
    await addedBlog.save()
    updatedBlog = {
      id: addedBlog._id,
      title: 'A blog which has been updated',
      author: addedBlog.author,
      url: addedBlog.url,
      likes: 10
    }
  })

  test('PUT /api/blogs/:id succeeds with proper statuscode', async () => {
    const blogsAtStart = await blogsInDb()

    await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAfter = await blogsInDb()

    expect(blogsAfter.length).toBe(blogsAtStart.length)
    expect(blogsAfter).toContainEqual(updatedBlog)
  })
})

describe('when there is initially one user at db', async () => {
  beforeAll(async () => {
    await User.remove({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      adult: true,
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
    const usernames = usersAfterOperation.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      adult: true,
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'username must be unique' })

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

})

afterAll(() => {
  server.close()
})