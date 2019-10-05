/*
 * action types
 */

export const ADD_TASK = 'ADD_TASK'

/*
 * action creators
 */

export function addTask(text) {
  return { type: ADD_TASK, text }
}
