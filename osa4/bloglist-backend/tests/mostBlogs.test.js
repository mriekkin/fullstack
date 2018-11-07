const listHelper = require('../utils/list_helper')
const testBlogs = require('./testBlogs')

describe('most blogs', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostBlogs([])).toBe(null)
  })

  test('when list has only blog equals that blog´s author', () => {
    expect(listHelper.mostBlogs(testBlogs.listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.mostBlogs(testBlogs.blogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})