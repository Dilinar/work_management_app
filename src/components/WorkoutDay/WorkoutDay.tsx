/* Libraries */
import { useState } from 'react';
import { 
    useSelector as reduxUseSelector, 
    TypedUseSelectorHook,  
} from 'react-redux';
import { 
    makeStyles, 
    Typography 
} from '@material-ui/core';

/* Types */
import { ReduxState } from '../../types/Redux';
import { WorkoutData } from '../../types/WorkoutData';

/* Application files */
import WorkoutEditor from '../WorkoutEditor';
import Button from '../Button';
import week from '../../lib/week.json';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        width: 'fit-content',
        listStyle: 'none',  
        border: '1px solid #ff5722',
        padding: '5px',
        borderRadius: '10px',
        margin: '0.3rem',
        backgroundColor: '#000000',
    },
    dayHeader: {
        fontSize: '1.3rem',
        margin: '0.3rem 0.3rem 0.8rem',
        textDecoration: 'underline',
    },
    workoutDay: {
        alignSelf: 'flex-start',
    },
}));

const useSelector = reduxUseSelector as TypedUseSelectorHook<ReduxState>;

type Props = {
    workout: WorkoutData;
    index: number;
}

export function WorkoutDay(props: Props) {

    const classes = useStyles();

    const { text, id } = props.workout;
    const index = props.index;
 
    const [ editing, setEditing ] = useState(false);
    const workouts = useSelector((state) => state.workoutCalendar);
    const editor = workouts.find((workout: { id: string }) => workout.id === id);

    function handleEditing() {
        setEditing(!editing);
    }

    return (
        <li className={classes.root}>
            <Typography variant='h4' className={classes.dayHeader}>{week[index]}</Typography>
            {text === '' ? 
                <Typography variant='body1'>No workout</Typography> : 
                text.split('\n').map((item, key) => (
                    <Typography variant='body1' key={key} className={classes.workoutDay}>{item}</Typography>
                ))}
            {editing && <WorkoutEditor workout={editor}/>}
            {editing ?
                <Button
                    variant='outlined' 
                    color='primary'
                    onClick={handleEditing}>
                    close
                </Button> :
                <Button
                    variant='outlined' 
                    color='primary'
                    onClick={handleEditing}>
                    edit
                </Button>
            }
        </li>
    );

}

export default WorkoutDay;
