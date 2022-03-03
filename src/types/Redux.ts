import { TaskData } from './TaskData';
import { WorkoutData } from './WorkoutData';

export type ReduxState = {
    tasks: ReduxStateTasks;
    workoutCalender: ReduxStateWorkoutCalender;
}

export type ReduxStateTasks = TaskData[];
export type ReduxStateWorkoutCalender = WorkoutData[];
