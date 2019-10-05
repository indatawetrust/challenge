import {connect} from 'react-redux';
import {getTasks, addTask, updateTask, deleteTask} from '../actions';
import TaskList from '../components/TaskList';

const mapStateToProps = state => {
  return {
    tasks: state.tasks.data,
    pending: state.tasks.pending,
    topPending: state.tasks.topPending,
    error: state.tasks.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: () => dispatch(getTasks()),
    createTask: (text, deadline) => dispatch(addTask(text, deadline)),
    changeTask: (id, completed) => dispatch(updateTask(id, completed)),
    removeTask: id => dispatch(deleteTask(id)),
  };
};

const VisibleTaskList = connect(mapStateToProps, mapDispatchToProps)(TaskList);

export default VisibleTaskList;
