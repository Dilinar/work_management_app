/* Libraries */
import { useState }from 'react';
import { 
    useSelector as reduxUseSelector, 
    TypedUseSelectorHook 
} from 'react-redux';
import { 
    makeStyles, 
    Typography 
} from '@material-ui/core';

/* Types */
import { ReduxState } from '../../types/Redux';

/* Application files */
import Workout from '../Workout';
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
        },
    },
    button: {
        width: 'fit-content',
        display: 'block',
    },
}));

const useSelector = reduxUseSelector as TypedUseSelectorHook<ReduxState>;

export function WorkoutCalender() {

    const classes = useStyles();

    const workout = useSelector((state) => state.workoutCalender);
    const workoutList = workout.map(workout => <Workout key={workout.id} workout={workout} />);
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
    }, 1000);

    function handleShow() {
        setShow(!show);
    }

    return (
        <div className={classes.root}>
            {show ? 
                <Typography variant='h3'>
                    Workout for the week:
                </Typography> : 
                <Typography variant='h3'>
                    Workout for today:
                </Typography>
            }
            {show ? workoutList : workoutList[day - 1]}      
            <Button className={classes.button}
                variant='outlined' 
                color='primary'
                onClick={handleShow}>
                {show ? 'Hide workout calender' : 'Show workout calender'}
            </Button>
        </div>
    );
        
}

export default WorkoutCalender;
