import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <span>
    <button onClick={handleClick}>
      {text}
    </button>
  </span>
)

const Anecdote = ({ text }) => (
  <div>
    {text}
  </div>
)

const Anecdotes = ({ text, vote, next }) => (
  <div>
    <Anecdote text={text} />
    <Button handleClick={vote} text='vote' />
    <Button handleClick={next} text='next anecdote' />
  </div>
)

const Heading = ({ title }) => (
  <h2>{title}</h2>
)

const MostVotes = ({ text, votes }) => {
  if (votes === 0) {
    return (
      <div>
        <Heading title='anecdote with most votes:' />
        0 votes cast
      </div>
    )
  }

  return (
    <div>
      <Heading title='anecdote with most votes:' />
      <Anecdote text={text} />
      has {votes} votes
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0, // Should the first anecdote be random as well?
      votes: new Array(this.length()).fill(0)
    }
  }

  length = () => this.props.anecdotes.length

  getCurrent = () => this.props.anecdotes[this.state.selected]

  randomInt(max) { // this is from the Mozilla docs
    return Math.floor(Math.random() * Math.floor(max))
  }

  next = () => {
    this.setState({ 
      selected: this.randomInt(this.length())
    })
  }

  vote = () => {
    let v = [...this.state.votes]
    v[this.state.selected] += 1
    this.setState({
      votes: v
    })
  }

  getIndexWithMostVotes = () => (
    this.state.votes.reduce((imax, curr, i) => {
      if (curr > this.state.votes[imax]) {
        return i
      }

      return imax
    }, 0)
  )

  render() {
    const imax = this.getIndexWithMostVotes()
    return (
      <div>
        <Anecdotes text={this.getCurrent()}
                   vote={this.vote}
                   next={this.next} />
        <MostVotes text={this.props.anecdotes[imax]}
                   votes={this.state.votes[imax]} />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)