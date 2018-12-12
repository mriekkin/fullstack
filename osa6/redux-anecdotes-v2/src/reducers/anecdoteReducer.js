import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  if (action.type === 'INIT') {
    return action.data
  }

  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    return [...old, action.newAnecdote ]
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

export const anecdoteCreation = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const anecdoteVoting = (id, newAnecdote) => {
  return {
    type: 'VOTE',
    id,
    newAnecdote
  }
}

export default reducer