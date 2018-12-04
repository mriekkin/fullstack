import React from 'react'
import blogService from '../services/blogs'

class CreateBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
    this.addBlog = props.addBlog
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  createBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })

      this.addBlog(blog)
      this.setState({ title: '', author: '', url: '' })
    } catch (exception) {
      this.setState({
        error: 'something went wrong: ' + exception,
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.createBlog}>
            <div>
              title
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleFieldChange}
              />
            </div>
            <div>
              author
              <input
                type="text"
                name="author"
                value={this.state.author}
                onChange={this.handleFieldChange}
              />
            </div>
            <div>
              url
              <input
                type="text"
                name="url"
                value={this.state.url}
                onChange={this.handleFieldChange}
              />
            </div>
            <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default CreateBlog