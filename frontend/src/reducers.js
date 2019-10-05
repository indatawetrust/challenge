import { combineReducers } from 'redux'

function tasks(state = { data: [] }, action) {
  switch (action.type) {
    case 'GET_TASKS_FULFILLED':
      return {
        ...state,
        data: action.payload.data
      }
    default:
      return state
  }
}

const taskApp = combineReducers({
  tasks
})

export default taskApp
