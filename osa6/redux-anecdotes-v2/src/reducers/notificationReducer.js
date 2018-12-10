const reducer = (state = null, action) => {
  if (action.type === 'SHOW_NOTIFICATION') {
    return action.message
  }

  if (action.type === 'HIDE_NOTIFICATION') {
    return null
  }

  return state
}

export const showMessage = (message) => {
  return {
    type: 'SHOW_NOTIFICATION',
    message
  }
}

export const hideMessage = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export default reducer