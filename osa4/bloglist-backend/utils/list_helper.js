const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const favorite = blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite
  })

  const formatBlog = (blog) => ({
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  })

  return formatBlog(favorite)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const first = blogs[0]
  let blogCounts = new Map()
  blogCounts.set(first.author, 0)

  const author = blogs.reduce((leader, blog) => {
    let n = 1
    if (blogCounts.has(blog.author)) {
      n += blogCounts.get(blog.author)
    }

    blogCounts.set(blog.author, n)

    if (n > blogCounts.get(leader)) {
      return blog.author
    }

    return leader
  }, first.author)

  return {
    author: author,
    blogs: blogCounts.get(author)
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}