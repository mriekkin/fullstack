const reducer = (state = 'Hello, world!', action) => {
  if (action.type === 'SHOW_NOTIFICATION') {
    state = action.message
  }

  if (action.type === 'HIDE_NOTIFICATION') {
    state = null
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