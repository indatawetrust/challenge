import {combineReducers} from 'redux'

function tasks(state = {
  data: [],
  pending: false,
  topPending: false,
}, action) {
  switch (action.type) {
    // GET TASK
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
    // ADD TASK
    case 'ADD_TASK_PENDING':
      return {
        ...state,
        topPending: true,
      }
    case 'ADD_TASK_FULFILLED':
      return {
        ...state,
        data: [
          action.payload.data,
          ...state.data
        ],
        topPending: false
      }
    case 'ADD_TASK_REJECTED':
      return {
        ...state,
        topPending: false,
        error: action.payload
      }
    // UPDATE TASK
    case 'UPDATE_TASK_PENDING':
      return {
        ...state,
        topPending: true,
      }
    case 'UPDATE_TASK_FULFILLED':
      state.data = state.data.map(task => {
        if (task._id === action.payload.data._id) {
          return action.payload.data
        }
        return task
      })

      return {
        ...state,
        topPending: false,
      }
    case 'UPDATE_TASK_REJECTED':
      return {
        ...state,
        topPending: false,
        error: action.payload
      }
    // DELETE TASK
    case 'DELETE_TASK_PENDING':
      return {
        ...state,
        topPending: true,
      }
    case 'DELETE_TASK_FULFILLED':
      state.data = state.data.filter(task => {
        return task._id !== action.payload.data._id;
      })

      return {
        ...state,
        topPending: false,
      }
    case 'DELETE_TASK_REJECTED':
      return {
        ...state,
        topPending: false,
        error: action.payload
      }
    default:
      return state
  }
}

const taskApp = combineReducers({tasks})

export default taskApp
