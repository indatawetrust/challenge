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

const TaskList = ({tasks, pending, fetchTasks, createTask}) => {
  useEffect(
    () => {
      fetchTasks();
    },
    [fetchTasks],
  );

  if (pending) {
    return <Loader type="Bubble" color="#00BFFF" height={100} width={100} />;
  }

  return (
    <Grid container spacing={2} alignItems="center" justify="center">
      <Grid md={8} lg={6} sm={12} xs={12}>
        <TextField
          id="standard-full-width"
          style={{margin: 8}}
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
        />
        <List>
          {tasks.map(task => {
            return (
              <ListItem key={task._id} role={undefined} dense button>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={false}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText id={1} primary={task.text} />
              </ListItem>
            );
          })}
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
