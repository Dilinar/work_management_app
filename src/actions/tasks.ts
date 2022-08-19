/* Types */
import { TaskData } from '../types/TaskData';

import { v4 as uuidv4 } from 'uuid';

export function setTasks (tasks: TaskData[]) {
    return {
        type: 'SET_TASKS',
        tasks
    };
}

export function addTask (task: Partial<TaskData>) {
    return {
        type: 'ADD_TASK',
        task: {
            ...task,
            id: uuidv4(),
            done: false
        } as TaskData 
    };
}

export function deleteTask (id: string) {
    return {
        type: 'DELETE_TASK',
        id
    };
}

export function doneTask (id: string) {
    return {
        type: 'DONE_TASK',
        id
    };
}
