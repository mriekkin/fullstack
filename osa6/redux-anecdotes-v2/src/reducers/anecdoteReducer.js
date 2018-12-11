const reducer = (store = [], action) => {
  if (action.type === 'INIT') {
    return action.data
  }

  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes + 1 } ]
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

export const anecdoteVoting = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export default reducer