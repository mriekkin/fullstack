import React from 'react'
import PropTypes from 'prop-types'
import '../index.css'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }
  const className = isError ? 'error' : 'success'
  return (
    <div className={className}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  isError: PropTypes.bool
}

export default Notification