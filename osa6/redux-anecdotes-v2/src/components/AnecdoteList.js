import React from 'react'
import Filter from './Filter'
import anecdoteService from '../services/anecdotes'
import { connect } from 'react-redux'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { showMessage, hideMessage } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleVote = (anecdote) => async () => {
    const newAnecdote = await anecdoteService.update(anecdote.id, {
      ...anecdote, votes: anecdote.votes + 1
    })

    this.props.anecdoteVoting(newAnecdote.id, newAnecdote)
    this.props.showMessage(`You voted '${newAnecdote.content}'`)
    setTimeout(() => {
      this.props.hideMessage()
    }, 5000)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.anecdotesToShow.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleVote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const getAnecdotesToShow = (anecdotes, filter) => {
  const filterLow = filter.toLowerCase()
  return anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().includes(filterLow))
    .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: getAnecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  anecdoteVoting,
  showMessage,
  hideMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)