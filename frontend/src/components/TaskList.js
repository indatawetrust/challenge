import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

const TaskList = ({tasks, pending, fetchTasks}) => {
  useEffect(
    () => {
      fetchTasks();
    },
    [fetchTasks],
  );

  if (pending) {
    return <Loader type="Bubble" color="#00BFFF" height={100} width={100} />;
  }

  return <ul>{tasks.map((task, index) => <li>{task.text}</li>)}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TaskList;
