import { connect } from 'react-redux'
import { getTasks } from '../actions'
import TaskList from '../components/TaskList'

const mapStateToProps = state => {
  return {
    tasks: state.tasks.data,
    pending: state.tasks.pending,
    error: state.tasks.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: () => dispatch(getTasks())
  }
}

const VisibleTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)

export default VisibleTaskList
