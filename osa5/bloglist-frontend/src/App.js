import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      message: null,
      isError: true,
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs => {
      this.sort(blogs)
      this.setState({ blogs })
    })

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      this.setState({user})
    }
  }

  sort = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes || a.id - b.id)
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.showNotification('wrong username or password', true)
    }
  }

  logout = (event) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    this.setState({ user: null })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = (newBlog) => {
    this.createBlogForm.toggleVisibility()
    this.showNotification(`a new blog '${newBlog.title}' by ${newBlog.author} added`)
    this.setState({ blogs: this.state.blogs.concat(newBlog) })
  }

  updateBlog = (updatedBlog) => {
    this.setState({
      blogs: this.sort(this.state.blogs.map(blog =>
        blog.id !== updatedBlog.id ? blog : updatedBlog))
      })
  }

  showNotification = (message, isError) => {
    this.setState({ message, isError })
    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
        <h2>Log in to application</h2>

        <Notification
          message={this.state.message}
          isError={this.state.isError}
        />

        <form onSubmit={this.login}>
          <div>
            username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
      )
    }

    return (
      <div>
        <h2>blogs</h2>
        <Notification
          message={this.state.message}
          isError={this.state.isError}
        />
        <p>
          {this.state.user.name} logged in
          <button onClick={this.logout}>logout</button>
        </p>
        <Togglable buttonLabel="new blog" ref={component => this.createBlogForm = component}>
          <CreateBlog
            addBlog={this.addBlog}
            showNotification={this.showNotification}
          />
        </Togglable>
        {this.state.blogs.map(blog => 
          <Blog key={blog.id} blog={blog} updateBlog={this.updateBlog} />
        )}
      </div>
    )
  }
}

export default App;
