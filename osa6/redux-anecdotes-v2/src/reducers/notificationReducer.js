const reducer = (state = null, action) => {
  if (action.type === 'SHOW_NOTIFICATION') {
    return action.message
  }

  if (action.type === 'HIDE_NOTIFICATION') {
    return null
  }

  return state
}

export const notify = (message, duration) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      message
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION'
      })
    }, duration * 1000)
  }
}

export default reducer