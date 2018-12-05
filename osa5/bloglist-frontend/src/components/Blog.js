import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blog: props.blog,
      isBig: false
    }
    this.updateBlog = props.updateBlog
    this.deleteBlog = props.deleteBlog
  }

  blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  detailsStyle = {
    paddingLeft: 10
  }

  handleClick = () => {
    this.setState({ isBig: !this.state.isBig })
  }

  handleLike = async (event) => {
    let updatedBlog = {
      likes: this.state.blog.likes + 1,
      title: this.state.blog.title,
      author: this.state.blog.author,
      url: this.state.blog.url,
    }

    if (this.state.blog.user) {
      updatedBlog.user = this.state.blog.user._id
    }

    const response = await blogService.update(this.state.blog.id, updatedBlog)
    if (!response.id) {
      console.log(response)
      return
    }

    // Manually "populate" the user property,
    // which is missing from the response
    if (this.state.blog.user) {
      response.user = {
        name: this.state.blog.user.name,
        username: this.state.blog.user.username,
        _id: this.state.blog.user._id
      }
    }

    // NOTE! This seems to work, but may be the wrong way to update state
    // We update both local (Blog) and global (App) state
    this.setState({ blog: response })
    this.updateBlog(response)
  }

  handleDelete = (event) => {
    if (window.confirm(`delete '${this.state.blog.title}' by ${this.state.blog.author}?`)) {
      this.deleteBlog(this.state.blog.id)
    }
  }

  getName = (user) => {
    if (!user) {
      return 'anonymous'
    }
    return user.name
  }

  render() {
    if (this.state.isBig) {
      return (
        <div style={this.blogStyle}>
          <div onClick={this.handleClick}>
            {this.state.blog.title} {this.state.blog.author}
          </div>
          <div style={this.detailsStyle}>
            <a href={this.state.blog.url}>{this.state.blog.url}</a><br/>
            {this.state.blog.likes} likes
              <button onClick={this.handleLike} blog={this.state.blog}>
                like
              </button><br/>
            added by {this.getName(this.state.blog.user)}<br/>
            <button onClick={this.handleDelete}>delete</button>
          </div>
        </div>
      )
    }

    return (
      <div style={this.blogStyle} onClick={this.handleClick}>
        {this.state.blog.title} {this.state.blog.author}
      </div>
    )
  }
}

export default Blog