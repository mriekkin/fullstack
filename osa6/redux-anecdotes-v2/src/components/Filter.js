import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const style = {
  marginBottom: 10
}

const Filter = (props) => (
  <div style={style}>
    filter <input onChange={(e) => props.filterChange(e.target.value)}/>
  </div>
)

export default connect(
  null,
  { filterChange }
)(Filter)