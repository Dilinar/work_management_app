/* Types */
import { WorkoutData } from '../types/WorkoutData';

export function setWorkouts (workouts: WorkoutData[]) {
    return {
        type: 'SET_WORKOUTS',
        workouts
    };
}

export function editWorkout (id: string, text: string) {
    return {
        type: 'EDIT_WORKOUT',
        id,
        text
    };
}
