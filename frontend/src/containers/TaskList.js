import { connect } from 'react-redux'
import TaskList from '../components/TaskList'

const mapStateToProps = state => {
  return {
    tasks: [{
      text: 'hello world',
      completed: false,
      _id: '12'
    }]
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const VisibleTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)

export default VisibleTaskList
