import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('when user is not logged in', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('only the login form is rendered', () => {
    app.update()
    const loginForm = app.find(LoginForm)
    const blogComponents = app.find(Blog)

    expect(loginForm.exists()).toBe(true)
    expect(blogComponents.length).toEqual(0)
  })
})

describe('when user is logged in', () => {
  let app
  beforeAll(() => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    app = mount(<App />)
  })

  it('all notes are rendered', () => {
    app.update()
    const loginForm = app.find(LoginForm)
    const blogComponents = app.find(Blog)

    expect(loginForm.exists()).toBe(false)
    expect(blogComponents.length).toEqual(blogService.blogs.length)
  })
})