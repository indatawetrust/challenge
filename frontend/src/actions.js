import axios from 'axios';
import { createAsyncAction } from 'redux-promise-middleware-actions';

axios.defaults.baseURL = process.env.REACT_APP_API;

export const getTasks = createAsyncAction('GET_TASKS', () => (
  axios.get('/task')
));

export const addTask = createAsyncAction('ADD_TASK', (text, deadline) => (
  axios.post('/task', {
    text,
    deadline
  })
));

export const updateTask = createAsyncAction('UPDATE_TASK', (id, completed) => (
  axios.put(`/task/${id}`, {
    completed
  })
));

export const deleteTask = createAsyncAction('DELETE_TASK', (id) => (
  axios.delete(`/task/${id}`)
));
