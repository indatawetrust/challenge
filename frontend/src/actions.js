import { createAsyncAction } from 'redux-promise-middleware-actions';

export const getTasks = createAsyncAction('GET_TASKS', () => (
  fetch('http://localhost:3001/task')
    .then((response) => response.json())
));
