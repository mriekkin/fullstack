import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  it('at first the details are not displayed', () => {
    const blog = {
      title: 'An example blog',
      author: 'John Doe',
      url: 'http://example.com',
      likes: 10
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <Blog
        blog={blog}
        updateBlog={mockHandler}
        deleteBlog={mockHandler}
        canDelete={true}
      />
    )

    const nameDiv = blogComponent.find('.name')
    const detailsDiv = blogComponent.find('.details')

    expect(nameDiv.text()).toContain('An example blog John Doe')
    expect(detailsDiv.exists()).toBe(false)
  })

  it('after clicking the name, the details are displayed', () => {
    const blog = {
      title: 'An example blog',
      author: 'John Doe',
      url: 'http://example.com',
      likes: 10
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <Blog
        blog={blog}
        updateBlog={mockHandler}
        deleteBlog={mockHandler}
        canDelete={true}
      />
    )

    const nameDiv = blogComponent.find('.name')
    nameDiv.simulate('click')

    const detailsDiv = blogComponent.find('.details')

    expect(nameDiv.text()).toContain('An example blog John Doe')
    expect(detailsDiv.text()).toContain(blog.url)
    expect(detailsDiv.text()).toContain('10 likes')
    expect(detailsDiv.text()).toContain('added by anonymous')
  })
})