import React from 'react'

const AddPerson = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          nimi:
          <input
            value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          numero:
          <input
            value={newNumber}
            onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    </div>
  )
}

export default AddPerson