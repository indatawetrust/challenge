import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import MoodIcon from '@material-ui/icons/Mood';
import {
  DateTimePicker,
} from "@material-ui/pickers";
import Button from '@material-ui/core/Button';
import moment from 'moment';

const useStyles = makeStyles({
  container: {
    margin: '1rem 0',
  },
  taskApp: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: '1rem',
    boxShadow: '0 0 2.5px #555',
    borderRadius: '2.5px'
  },
  taskList: {
    height: '500px',
    overflowY: 'scroll',
    border: '1px solid #ccc',
    padding: '1rem'
  },
  taskListItem: {
    borderBottom: '1px solid #ccc'
  },
  textInput: {
    margin: '9px 0'
  },
  noDataIcon: {
    width: 100,
    height: 100,
    color: '#ccc'
  },
  completed: {
    color: '#2ecc71',
  },
  uncompleted: {
    color: '#34495e',
  }
});

const TaskList = ({tasks, pending, error, fetchTasks, createTask, changeTask, removeTask, ...props}) => {
  const classes = useStyles(props);

  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState(new Date());

  function saveTask() {
    if (text.trim().length) {
      createTask(text, deadline)
    }
  }

  useEffect(
    () => {
      fetchTasks();
    },
    [fetchTasks],
  );

  return (
    <Grid container spacing={2} alignItems="center" justify="center" className={classes.container}>
      <Grid item md={8} lg={6} sm={10} xs={10} className={classes.taskApp}>
        <TextField
          id="standard-full-width"
          placeholder="new task..."
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onInput={e => setText(e.target.value)}
          onKeyDown={e => {
            const {value} = e.target

            if (e.keyCode === 13) {
              saveTask()

              e.target.value = ''
            }
          }}
          className={classes.textInput}
        />
        <Grid container>
          <Grid item xs={9}>
            <DateTimePicker label="deadline" fullWidth value={deadline} onChange={deadline => setDeadline(deadline)} />
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={saveTask} size="small" fullWidth color="primary">
              save
            </Button>
          </Grid>
        </Grid>
        <List className={classes.taskList} style={{
          height: `${window.innerHeight - 180}px`
        }}>
          {
            pending
            &&
            <Loader type="Circles" color="#555" height={50} width={50} />
          }
          {
            (!pending && !tasks.length)
            ?
            (
              <MoodIcon className={classes.noDataIcon}/>
            ):null
          }
          {
            (!pending && tasks.length)
            ?
            tasks.map(task => {
              return (
                <ListItem key={task._id} className={[classes.taskListItem, task.completed ? classes.completed : classes.uncompleted].join(' ')} dense button onClick={e => {
                  e.preventDefault()

                  changeTask(task._id, !task.completed)
                }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={task.completed}
                      tabIndex={-1}
                      disableRipple
                      onChange={e => {
                        e.preventDefault()

                        changeTask(task._id, e.target.checked)
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={task.text} secondary={
                    (new Date(task.deadline) > new Date() && !task.completed)
                    &&
                    `This work must be completed ${moment(task.deadline).fromNow()}`
                  } />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={e => {

                      e.preventDefault()

                      removeTask(task._id)

                    }}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            }):null
          }
        </List>
      </Grid>
    </Grid>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TaskList;
