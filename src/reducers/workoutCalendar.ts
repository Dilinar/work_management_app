/* Libraries */
import { AnyAction } from 'redux';

/* Types */
import { ReduxStateWorkoutCalendar } from '../types/Redux';
import { WorkoutData } from '../types/WorkoutData';

function getInitialState(): ReduxStateWorkoutCalendar{
    const workoutCalendar = localStorage.getItem('workoutCalendar');
    if(workoutCalendar) {
        const parsed = JSON.parse(workoutCalendar) as (WorkoutData)[];

        return parsed;
    }

    localStorage.setItem('workoutCalendar', JSON.stringify([]));
    return [];
}

export default function workoutCalendar (state = getInitialState(), action: AnyAction) {
  
    switch (action.type) {
        case 'SET_WORKOUTS': {
            localStorage.setItem('workoutCalendar', JSON.stringify(action.workouts));
            return action.workouts;
        }
        case 'ADD_WORKOUT': {
            const workouts = [ action.workout, ...state ];
            localStorage.setItem('workoutCalendar', JSON.stringify(workouts));
            return workouts;
        }
        case 'EDIT_WORKOUT': {
            const workout = state.find(workout => workout.id === action.id);
            if(!workout) return state;

            workout.text = action.text;
            const workoutCalendar = [ ...state ];
            localStorage.setItem('workoutCalendar', JSON.stringify(workoutCalendar));
            return workoutCalendar;
        }
        default: {
            return state;
        }
    }
}
