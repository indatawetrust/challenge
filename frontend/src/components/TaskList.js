import React, {useEffect, useState, useRef} from 'react';
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
import {makeStyles} from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import MoodIcon from '@material-ui/icons/Mood';
import {DateTimePicker} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import LoadingBar from 'react-top-loading-bar';

const useStyles = makeStyles({
  container: {
    margin: '0rem 0',
    width: '100%'
  },
  taskApp: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: '1rem',
    boxShadow: '0 0 2.5px #555',
    borderRadius: '2.5px',
  },
  taskList: {
    height: '500px',
    overflowY: 'scroll',
    border: '1px solid #ccc',
    padding: '1rem',
  },
  taskListItem: {
    borderBottom: '1px solid #ccc',
  },
  textInput: {
    margin: '9px 0',
  },
  noDataIcon: {
    width: 100,
    height: 100,
    color: '#ccc',
  },
  completed: {
    color: '#2ecc71',
  },
  uncompleted: {
    color: '#34495e',
  },
});

const TaskList = ({
  tasks,
  pending,
  topPending,
  error,
  fetchTasks,
  createTask,
  changeTask,
  removeTask,
  ...props
}) => {
  const classes = useStyles(props);

  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const loadingBar = useRef(null);

  function saveTask() {
    if (text.trim().length) {
      createTask(text, deadline);

      setText('');
    }
  }

  useEffect(
    () => {
      fetchTasks();
    },
    [fetchTasks],
  );

  useEffect(
    () => {
      if (topPending) {
        loadingBar.current.continuousStart();
      } else {
        loadingBar.current.complete();
      }
    },
    [topPending],
  );

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.container}>
      <Grid item md={8} lg={6} sm={10} xs={10} className={classes.taskApp}>
        <LoadingBar
          progress={0}
          height={8}
          color="#9b59b6"
          onRef={ref => {
            loadingBar.current = ref;
          }}
        />
        <TextField
          id="input"
          placeholder="new task..."
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={text}
          onInput={e => setText(e.target.value)}
          onKeyDown={e => {
            const {value} = e.target;

            if (e.keyCode === 13) {
              saveTask();

              setText('');
            }
          }}
          className={classes.textInput}
        />
        <Grid container>
          <Grid item xs={9}>
            <DateTimePicker
              label="deadline"
              fullWidth
              value={deadline}
              onChange={deadline => setDeadline(deadline)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              onClick={saveTask}
              size="small"
              fullWidth
              color="primary">
              save
            </Button>
          </Grid>
        </Grid>
        <List
          className={classes.taskList}
          style={{
            height: `450px`,
          }}>
          {pending && (
            <Loader type="Circles" color="#555" height={50} width={50} />
          )}
          {!pending && !tasks.length ? (
            <MoodIcon className={classes.noDataIcon} />
          ) : null}
          {!pending && tasks.length
            ? tasks.map(task => {
                return (
                  <ListItem
                    key={task._id}
                    className={[
                      classes.taskListItem,
                      task.completed ? classes.completed : classes.uncompleted,
                    ].join(' ')}
                    dense
                    button
                    onClick={e => {
                      e.preventDefault();

                      changeTask(task._id, !task.completed);
                    }}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={task.completed}
                        tabIndex={-1}
                        disableRipple
                        onChange={e => {
                          e.preventDefault();

                          changeTask(task._id, e.target.checked);
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={task.text}
                      secondary={
                        new Date(task.deadline) > new Date() &&
                        !task.completed &&
                        `This work must be completed ${moment(
                          task.deadline,
                        ).fromNow()}`
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={e => {
                          e.preventDefault();

                          removeTask(task._id);
                        }}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })
            : null}
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
