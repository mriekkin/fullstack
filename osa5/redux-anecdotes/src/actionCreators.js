const actionFor = {
  voting(id) {
    return {
      type: 'VOTE',
      data: {
        id: id
      }
    }
  }
}

export default actionFor