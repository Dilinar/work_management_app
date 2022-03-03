/* Libraries */
import { ReduxState } from '../../types/Redux';
import { 
    useSelector as reduxUseSelector, 
    TypedUseSelectorHook 
} from 'react-redux';
import { 
    makeStyles, 
    Typography 
} from '@material-ui/core';

/* Application files */
import Task from '../Task';

const useSelector = reduxUseSelector as TypedUseSelectorHook<ReduxState>;

const useStyles = makeStyles(() => ({
    list: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        width: '50vw',
    },
    listHeader: {
        margin: '0.5rem 0',
        textAlign: 'center',
        borderTop: '1px solid #ff5722',
        borderBottom: '1px solid #ff5722',
    }
}));

export function TaskList() {

    const classes = useStyles();

    const tasks = useSelector((state) => state.tasks);

    const active = tasks.filter(task => !task.done);
    const done = tasks.filter(task => task.done);

    const activeTasksList = active.reverse().map(task => <Task key={task.id} task={task} />);
    const doneTasksList = done.reverse().map(task => <Task key={task.id} task={task} />);

    return (
        <div>
            <Typography variant='h5'>
                <p className={classes.listHeader}>
                    Active tasks
                </p>
            </Typography>
            <div className={classes.list}>
                {activeTasksList.length === 0 ? 'No active tasks' : activeTasksList}
            </div>
            <Typography variant='h5'>
                <p className={classes.listHeader}>
                    Finished tasks
                </p>
            </Typography>
            <div className={classes.list}>
                {doneTasksList.length === 0 ? 'No finished tasks' : doneTasksList}
            </div>
        </div>
    );
}

export default TaskList;
