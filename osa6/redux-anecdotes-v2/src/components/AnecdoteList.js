import React from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { showMessage, hideMessage } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleVote = (anecdote) => () => {
    this.props.anecdoteVoting(anecdote.id)
    this.props.showMessage(`You voted '${anecdote.content}'`)
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