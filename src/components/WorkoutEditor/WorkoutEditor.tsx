/* Libraries */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';

/* Types */
import { WorkoutData } from '../../types/WorkoutData';

/* Application files */
import Button from '../Button';
import TextField from '../TextField';
import { editWorkout } from '../../actions/workout';


const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
    },  
    textField: {
        width: '40vw',
    },
    button: {
        margin: '0.5rem',
    },
}));


type Props = {
    workout: WorkoutData;
}

export function WorkoutEditor(props: Props) {

    const classes = useStyles();
 
    const { id, text } = props.workout;

    const dispatch = useDispatch();
    const [ newText, setNewText ] = useState(text);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        dispatch(editWorkout(id, newText));
    }

    function handleText(e: React.ChangeEvent<HTMLInputElement>) {
        setNewText(e.target.value);
    }

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField className={classes.textField}
                id='outlined-basic' 
                label='workout' 
                variant='outlined' 
                type='text' 
                size='small'
                value={newText} 
                onChange={handleText}
                multiline
            />
            <Button className={classes.button}
                variant='outlined' 
                color='primary'
                type='submit'>
                save
            </Button>
        </form>
    );

}

export default WorkoutEditor;
