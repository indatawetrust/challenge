import React from 'react'
import PropTypes from 'prop-types'

const TaskList = ({ tasks }) => {

  return ((
    <ul>
      {
        tasks.map((task, index) => (
        <li>{task.text}</li>
      ))
    }
    </ul>
  ))

}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}

export default TaskList
