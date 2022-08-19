/* Libraries */
import { 
    useState,
    // useMemo
}from 'react';
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

/* Types */
import { ReduxState } from '../../types/Redux';

/* Application files */
import { setWorkouts } from '../../actions/workout';
import AddWorkout from '../AddWorkout';
import WorkoutDay from '../WorkoutDay';
import Button from '../Button';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        width: '50vw',
        paddingTop: '2rem',
        '& h3': {
            textAlign: 'center',
            marginBottom: '2rem'
        },
    },
    list: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        width: '50vw',
    },
    button: {
        width: 'fit-content',
        display: 'block',
    },
}));

const useSelector = reduxUseSelector as TypedUseSelectorHook<ReduxState>;

export function WorkoutCalendar() {

    const classes = useStyles();

    const dispatch = useDispatch();
    const workout = useSelector((state) => state.workoutCalendar);
    const workoutList = workout.map((workout, index) => <WorkoutDay key={workout.id} workout={workout} index={index}/> );
    const today = new Date().getDay();
    
    const [ day, setDay ] = useState(today);
    const [ show, setShow ] = useState(false);
    
    function updater() {
        const newDay = new Date().getDay();

        if(newDay !== day) {
            setDay(newDay);
        }
    }

    setInterval(() => {
        updater();
    }, 60000);

    function handleShow() {
        setShow(!show);
    }

    function onActiveItemsReorder (e: Sortable.SortableEvent) {
        const updated = [ ...workout ];
        const item = updated.splice(e.oldIndex, 1);
        updated.splice(e.newIndex, 0, item[0]);

        dispatch(setWorkouts(updated));
    }
 
    return (
        <div className={classes.root}>
            <Typography variant='h3'>
                Workout Calendar
            </Typography>
            {workoutList.length < 7 ?
                <AddWorkout /> :
                null
            }
            {show ? 
                <Typography variant='h4'>
                    Workout for the week:
                </Typography> : 
                <Typography variant='h4'>
                    Workout for today:
                </Typography>
            }
            <Button className={classes.button}
                variant='outlined' 
                color='primary'
                onClick={handleShow}>
                {show ? 'Hide workout calendar' : 'Show workout calendar'}
            </Button>
            <div>
                {!show ? workoutList[day == 0 ? day + 6 : day - 1] : (
                    <ReactSortable 
                        className={classes.list}
                        list={workout}
                        // eslint-disable-next-line @typescript-eslint/no-empty-function 
                        setList={() => {}} 
                        animation={150} 
                        onEnd={onActiveItemsReorder}
                    >
                        {workoutList}
                    </ReactSortable>
                )}      
            </div>
        </div>
    );      
}

export default WorkoutCalendar;
