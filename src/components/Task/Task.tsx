/* Libraries */
import { useDispatch } from 'react-redux';
import { 
    makeStyles, 
    Typography 
} from '@material-ui/core';

/* Types */
import { TaskData } from '../../types/TaskData';

/* Application files */
import { deleteTask, doneTask } from '../../actions/tasks';
import Button from '../Button';

type Props = {
    task: TaskData;
}

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        listStyle: 'none',  
        width: 'fit-content',
        border: '1px solid #ff5722',
        padding: '0.3rem',
        borderRadius: '10px',
        margin: '0.3rem',
        '& p': {
            margin: '0.5rem 0',
        }
    },
    buttons: {
        display: 'flex',
        flexFlow: 'column wrap',
        '@media (min-width: 390px)': {
            flexFlow: 'row wrap',
        },
    },
}));

export function Task(props: Props) {

    const classes = useStyles();
 
    const dispatch = useDispatch();

    const { id, text, done } = props.task;

    function handleDelete() {
        dispatch(deleteTask(id));
    }

    function handleDone() {
        dispatch(doneTask(id));
    }

    const doneStyle = {
        textDecoration: 'line-through'
    };

    return (
        <li className={classes.root}>
            <div 
                style={done ? doneStyle : undefined}>
                {text.split('\n').map((item, key) => (
                    <Typography variant='body1' key={key}>{item}</Typography>))}
            </div>
            <div className={classes.buttons}>
                {!done &&
                    <Button
                        variant='outlined' 
                        color='primary'
                        onClick={handleDone}>
                        done
                    </Button>
                }
                <Button
                    variant='outlined' 
                    color='primary'
                    onClick={handleDelete}>
                    X
                </Button>
            </div>
        </li>
    );

}

export default Task;
