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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}