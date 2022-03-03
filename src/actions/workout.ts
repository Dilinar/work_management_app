export function editWorkout (id: string, text: string) {
    return {
        type: 'EDIT_WORKOUT',
        id,
        text
    };
}
