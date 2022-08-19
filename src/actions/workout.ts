/* Types */
import { WorkoutData } from '../types/WorkoutData';

import { v4 as uuidv4 } from 'uuid';

export function setWorkouts (workouts: WorkoutData[]) {
    return {
        type: 'SET_WORKOUTS',
        workouts
    };
}

export function addWorkout (workout: Partial<WorkoutData>) {
    return {
        type: 'ADD_WORKOUT',
        workout: {
            ...workout,
            id: uuidv4(),
        } as WorkoutData
    };
}

export function editWorkout (id: string, text: string) {
    return {
        type: 'EDIT_WORKOUT',
        id,
        text
    };
}
