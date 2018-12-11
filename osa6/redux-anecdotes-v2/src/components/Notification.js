import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    if (this.props.message === null) {
      return null
    }
    return (
      <div style={style}>
        {this.props.message}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification
