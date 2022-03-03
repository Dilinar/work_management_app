/* Libraries */
import { AnyAction } from 'redux';

/* Types */
import { WorkoutData } from '../types/WorkoutData';

/* Application files */
import DefaultState from '../lib/defaultWorkouts.json';

function save(workoutCalender: WorkoutData[]) {
    localStorage.setItem('workoutCalender', JSON.stringify(workoutCalender));
  
    return workoutCalender;
}

const workout = localStorage.getItem('workoutCalender');

const initialState = workout ? JSON.parse(workout) as (WorkoutData[]) : save(DefaultState);

export default function workoutCalender (state = initialState, action: AnyAction) {
  
    switch (action.type) {
        case 'EDIT_WORKOUT': {
            const workout = state.find(workout => workout.id === action.id);
            if(!workout) return state;

            workout.text = action.text;
            const workoutCalender = [ ...state ];
            localStorage.setItem('workoutCalender', JSON.stringify(workoutCalender));
            return workoutCalender;
        }
        default: {
            return state;
        }
    }
}
