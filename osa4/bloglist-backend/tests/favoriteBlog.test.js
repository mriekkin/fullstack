const listHelper = require('../utils/list_helper')
const testBlogs = require('./testBlogs')

describe('favorite blog', () => {
  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toBe(null)
  })

  test('when list has only blog equals that blog', () => {
    expect(listHelper.favoriteBlog(testBlogs.listWithOneBlog)).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.favoriteBlog(testBlogs.blogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})