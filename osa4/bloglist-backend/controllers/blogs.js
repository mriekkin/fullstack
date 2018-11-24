const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map(formatBlog))
  } catch (exception) {
    response.status(500).json({ error: 'something went wrong...' })
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (!body.title) {
      return response.status(400).json({ error: 'title missing' })
    }

    if (!body.url) {
      return response.status(400).json({ error: 'URL missing' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    })

    const result = await blog.save()
    response.status(201).json(formatBlog(result))
  } catch (exception) {
    response.status(500).json({ error: 'something went wrong...' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformed id' })
  }
})

module.exports = blogsRouter