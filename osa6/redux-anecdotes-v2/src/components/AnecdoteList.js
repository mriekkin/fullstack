import React from 'react'
import Filter from './Filter'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleVote = (anecdote) => async () => {
    this.props.vote(anecdote)
    this.props.notify(`You voted '${anecdote.content}'`, 5)
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
  vote,
  notify
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)