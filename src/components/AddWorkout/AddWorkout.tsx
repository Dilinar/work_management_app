/* Libraries */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
    makeStyles, 
    Typography 
} from '@material-ui/core';

/* Application files */
import { addWorkout } from '../../actions/workout';
import WorkoutCalendar from '../WorkoutCalendar';
import TextField from '../TextField';
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
        margin: '3px auto 10px',
    },
    textField: {
        width: '40vw',
    },
}));

export function AddWorkout () {

    const classes = useStyles();

    const dispatch = useDispatch();

    const [ text, setText ] = useState('');

    function handleText(e: React.ChangeEvent<HTMLInputElement>) {
        setText(e.target.value);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        dispatch(addWorkout({text}));
        setText('');
    }

    return (
        <div className={classes.root}>
            <Typography variant='h3'>
                Workout Calendar
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField className={classes.textField}
                    id='outlined-basic' 
                    label='add a workout' 
                    variant='outlined' 
                    type='text' 
                    size='small'
                    value={text} 
                    onChange={handleText}
                    multiline
                />
                {!text ?
                    <Button className={classes.button}
                        disabled
                        variant='outlined' 
                        color='primary'>
                        Add workout
                    </Button> :
                    <Button className={classes.button}
                        variant='outlined' 
                        color='primary'
                        type='submit'>
                        Add workout
                    </Button>
                }   
            </form>
            <WorkoutCalendar />
        </div>
    );
}

export default AddWorkout;
