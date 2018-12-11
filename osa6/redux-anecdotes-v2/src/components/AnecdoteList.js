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
        {this.props.anecdotes
          .filter(anecdote => anecdote.content.toLowerCase().includes(this.props.filterLow))
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filterLow: state.filter.toLowerCase()
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
