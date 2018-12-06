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

    const noteComponent = shallow(<SimpleBlog blog={blog} />)
    const titleDiv = noteComponent.find('.title')
    const likesDiv = noteComponent.find('.likes')

    expect(titleDiv.text()).toContain(blog.title)
    expect(titleDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain('blog has 10 likes')
  })
})