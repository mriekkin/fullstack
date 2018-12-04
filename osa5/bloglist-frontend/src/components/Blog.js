import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blog: props.blog,
      isBig: false
    }
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

  getName = (user) => {
    if (!user) {
      return ''
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
            {this.state.blog.likes} likes <button>like</button><br/>
            added by {this.getName(this.state.blog.user)}
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