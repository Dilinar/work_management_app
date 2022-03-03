/* Libraries */
import { combineReducers } from 'redux';

/* Application files */
import tasks from './taskList';
import workoutCalender from './workoutCalender';

export default combineReducers({
    tasks,
    workoutCalender
});
