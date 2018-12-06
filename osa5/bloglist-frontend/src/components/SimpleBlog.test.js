import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders title, author and likes', () => {
    const blog = {
      title: 'A simple blog',
      author: 'John Doe',
      likes: 10
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const titleDiv = blogComponent.find('.title')
    const likesDiv = blogComponent.find('.likes')

    expect(titleDiv.text()).toContain(blog.title)
    expect(titleDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain('blog has 10 likes')
  })

  it('clicking the like button twice calls the event handler twice', () => {
    const blog = {
      title: 'A simple blog',
      author: 'John Doe',
      likes: 10
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})