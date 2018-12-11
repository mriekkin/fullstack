import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { showMessage, hideMessage } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''

    const newAnecdote = await anecdoteService.create(content)
    this.props.anecdoteCreation(newAnecdote)
    this.props.showMessage(`You added '${newAnecdote.content}'`)
    setTimeout(() => {
      this.props.hideMessage()
    }, 5000)
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name="anecdote"/></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  anecdoteCreation,
  showMessage,
  hideMessage
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
