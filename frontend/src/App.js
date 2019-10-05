import React from 'react';
import './App.css';
import TaskList from './containers/TaskList';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function App() {
  return (
    <div className="App">
      <TaskList />
    </div>
  );
}

export default App;
