/* Libraries */
import { useMemo } from 'react';
import { 
    Sortable,
    ReactSortable
} from 'react-sortablejs';
import { 
    useSelector as reduxUseSelector, 
    TypedUseSelectorHook, 
    useDispatch
} from 'react-redux';
import { 
    makeStyles, 
    Typography 
} from '@material-ui/core';

/*Types*/
import { ReduxState } from '../../types/Redux';

/* Application files */
import { setTasks } from '../../actions/tasks';
import Task from '../Task';

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

const useSelector = reduxUseSelector as TypedUseSelectorHook<ReduxState>;

export function TaskList() {

    const classes = useStyles();

    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);

    const active = useMemo(() => tasks.filter(task => !task.done), [ tasks ]);
    const done = useMemo(() => tasks.filter(task => task.done), [ tasks ]);

    const activeTasksList = active.map(task => <Task key={task.id} task={task} />);
    const doneTasksList = done.map(task => <Task key={task.id} task={task} />);

    function onActiveItemsReorder (e: Sortable.SortableEvent) {
        const updated = [ ...tasks ];
        const item = updated.splice(e.oldIndex, 1);
        updated.splice(e.newIndex, 0, item[0]);

        dispatch(setTasks(updated));
    }

    return (
        <div>
            <Typography variant='h5'>
                <p className={classes.listHeader}>
                    Active tasks
                </p>
            </Typography>
            <div>
                {activeTasksList.length === 0 ? 'No active tasks' : ( 
                    <ReactSortable
                        className={classes.list}
                        list={active || []} 
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        setList={() => {}}  
                        animation={150} 
                        onEnd={onActiveItemsReorder} 
                    >
                        {activeTasksList}
                    </ReactSortable>
                )}
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
