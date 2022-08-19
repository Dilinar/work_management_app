/* Libraries */
import { combineReducers } from 'redux';

/* Application files */
import tasks from './taskList';
import workoutCalendar from './workoutCalendar';

export default combineReducers({
    tasks,
    workoutCalendar
});
