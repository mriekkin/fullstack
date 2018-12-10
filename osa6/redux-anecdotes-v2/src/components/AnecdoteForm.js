import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { showMessage, hideMessage } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.store.dispatch(
      anecdoteCreation(content)
    )

    this.props.store.dispatch(
      showMessage(`You added '${content}'`)
    )
    setTimeout(() => {
      this.props.store.dispatch(
        hideMessage()
      )
    }, 5000)

    e.target.anecdote.value = ''
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

export default AnecdoteForm
