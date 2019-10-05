import React, {useEffect} from 'react';
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
  }
});

const TaskList = ({tasks, pending, fetchTasks, createTask, changeTask, ...props}) => {
  const classes = useStyles(props);

  useEffect(
    () => {
      fetchTasks();
    },
    [fetchTasks],
  );

  return (
    <Grid container spacing={2} alignItems="center" justify="center" className={classes.container}>
      <Grid md={8} lg={6} sm={10} xs={10} className={classes.taskApp}>
        <TextField
          id="standard-full-width"
          placeholder="new task..."
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onKeyDown={e => {

            const {value} = e.target

            if (e.keyCode === 13 && value.trim().length) {
              createTask(value)

              e.target.value = ''
            }
          }}
          className={classes.textInput}
        />
        <List className={classes.taskList} style={{
          height: `${window.innerHeight - 150}px`
        }}>
          {
            pending
            &&
            <Loader type="Bubble" color="#555" height={50} width={50} />
          }
          {
            !pending
            &&
            tasks.map(task => {
              return (
                <ListItem key={task._id} className={classes.taskListItem} dense button onClick={e => {
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
                  <ListItemText id={1} primary={task.text} />
                </ListItem>
              );
            })
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
