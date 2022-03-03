/* Libraries */
import { AnyAction } from 'redux';

/* Types */
import { ReduxStateTasks} from '../types/Redux';
import { TaskData } from '../types/TaskData';

function getInitialState(): ReduxStateTasks {
    const tasks = localStorage.getItem('tasks');
    if(tasks) {
        const parsed = JSON.parse(tasks) as (TaskData)[];

        return parsed;
    }

    localStorage.setItem('tasks', JSON.stringify([]));
    return [];
}


export default function tasks (state = getInitialState(), action: AnyAction) {
  
    switch (action.type) {
        case 'ADD_TASK': {
            const tasks = [ ...state, action.task ];
            localStorage.setItem('tasks', JSON.stringify(tasks));
            return tasks;
        }
        case 'DELETE_TASK': {
            const task = state.findIndex((task) => task.id === action.id);
            if(task === -1) return state;

            state.splice(task, 1);
            const tasks = [ ...state ];
            localStorage.setItem('tasks', JSON.stringify(tasks));
            return tasks;
        }
        case 'DONE_TASK': {
            const task = state.find((task => task.id === action.id));
            if(!task) return state;

            task.done = true;
            const tasks = [ ...state ];
            localStorage.setItem('tasks', JSON.stringify(tasks));
            return tasks;
        }
        default: {
            return state;
        }
    }
}
