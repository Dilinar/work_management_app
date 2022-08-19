import { TaskData } from './TaskData';
import { WorkoutData } from './WorkoutData';

export type ReduxState = {
    tasks: ReduxStateTasks;
    workoutCalendar: ReduxStateWorkoutCalendar;
}

export type ReduxStateTasks = TaskData[];
export type ReduxStateWorkoutCalendar = WorkoutData[];
