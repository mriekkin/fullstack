const actionFor = {
  voting(id) {
    return {
      type: 'VOTE',
      data: {
        id: id
      }
    }
  },
  anecdoteCreation(content) {
    return {
      type: 'NEW_ANECDOTE',
      data: {
        content: content
      }
    }
  }
}

export default actionFor