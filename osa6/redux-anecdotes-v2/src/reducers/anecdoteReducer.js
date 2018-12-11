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

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT',
    data
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