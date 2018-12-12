import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  if (action.type === 'INIT') {
    return action.data
  }

  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    return [...old, action.updatedAnecdote ]
  }

  if (action.type === 'CREATE') {
    return [...store, action.data]
  }

  return store
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const createNew = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const vote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(anecdote.id, {
      ...anecdote, votes: anecdote.votes + 1
    })
    dispatch({
      type: 'VOTE',
      id: anecdote.id,
      updatedAnecdote
    })
  }
}

export default reducer