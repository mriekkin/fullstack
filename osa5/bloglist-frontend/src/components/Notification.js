import React from 'react'
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

export default Notification