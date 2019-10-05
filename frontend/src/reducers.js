import { combineReducers } from 'redux'

function tasks(state = { data: [], pending: false }, action) {
  switch (action.type) {
    case 'GET_TASKS_PENDING':
      return {
        ...state,
        pending: true
      }
    case 'GET_TASKS_FULFILLED':
      return {
        ...state,
        data: action.payload.data,
        pending: false
      }
    case 'GET_TASKS_REJECTED':
      return {
        ...state,
        pending: false,
        error: action.payload
      }
    default:
      return state
  }
}

const taskApp = combineReducers({
  tasks
})

export default taskApp
