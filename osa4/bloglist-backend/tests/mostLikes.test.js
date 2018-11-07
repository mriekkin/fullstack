const listHelper = require('../utils/list_helper')
const testBlogs = require('./testBlogs')

describe('most likes', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostLikes([])).toBe(null)
  })

  test('when list has only blog equals that blog´s author', () => {
    expect(listHelper.mostLikes(testBlogs.listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.mostLikes(testBlogs.blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})