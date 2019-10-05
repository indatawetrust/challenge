import axios from 'axios';
import { createAsyncAction } from 'redux-promise-middleware-actions';

axios.defaults.baseURL = process.env.REACT_APP_API;

export const getTasks = createAsyncAction('GET_TASKS', () => (
  axios.get('/task')
));
