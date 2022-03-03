/* Libraries */
import { 
    useState, 
    useEffect, 
    useRef 
}from 'react';
import { makeStyles } from '@material-ui/core';

/* Application files */
import Button from '../Button';
import TextField from '../TextField';
import alarm from '../../assets/sounds/alarm.mp3';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
    },
    textField: {
        width: '6rem',
    },
    buttons: {
        display: 'flex',
        flexFlow: 'column wrap',
        '@media (min-width: 360px)': {
            flexFlow: 'row wrap',
        },
    },
}));

export function Timer() {

    const classes = useStyles();

    const [ timer, setTimer ] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    } );
    const [ started, setStarted ] = useState(localStorage.getItem('timerStarted') || false);
    const [ current, setCurrent ] = useState(parseInt(localStorage.getItem('timerCurrent') as string) || 0);
    const [ id, setId ] = useState((null) as unknown as number); 

    const currentRef = useRef(current);
    currentRef.current = current;  
 
    function handleInputChange(name: string) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setTimer({
                ...timer,
                [name]: e.target.value 
            });
        };
    }

    useEffect(() => {
        if(started === true || started === 'true') {
            setTimes();
            const id = window.setInterval(() => {
                setCurrent(current => current - 1);
                setTimes();
                if(currentRef.current === 0) {
                    soundAlarm();
                }
            }, 1000);
            setId(id);
        } else {
            clearInterval(id);
            setTimes();
        }
    }, [ started ]);

    function soundAlarm() {
        const sound = new Audio(alarm);
        sound.play();
    }

    function setTimes() {
        if(currentRef.current === 0) {
            setStarted(false);
        }
        setTimer({
            hours: Math.floor(currentRef.current / 3600),
            minutes: Math.floor((currentRef.current % 3600) / 60),
            seconds: currentRef.current % 60,
        });
    }

    function handleTimer() {
        if(timer.hours + timer.minutes + timer.seconds === 0) {
            setStarted(false);
            return;
        }
        setCurrent(timer.hours * 3600 + timer.minutes * 60 + timer.seconds * 1);
        setStarted(!started);
    }

    function clearTimer() {
        setStarted(false);
        setCurrent(0);
        setTimer({
            hours: 0,
            minutes: 0,
            seconds: 0,
        });
    }

    useEffect(() => {
        localStorage.setItem('timerCurrent', current.toString());
    }, [ current ]);

    useEffect(() => {
        localStorage.setItem('timerStarted', started.toString());
    }, [ started ]);

    return (
        <div className={classes.root}>
            <h3>Timer</h3>
            <TextField className={classes.textField}
                id='outlined-basic' 
                label='hours' 
                variant='outlined' 
                type='number' 
                size='small'
                value={timer.hours}
                onChange={handleInputChange('hours')}
            />
            <TextField className={classes.textField}
                id='outlined-basic' 
                label='minutes' 
                variant='outlined' 
                type='number' 
                size='small'
                value={timer.minutes}
                onChange={handleInputChange('minutes')}
            />
            <TextField className={classes.textField} 
                id='outlined-basic' 
                label='seconds' 
                variant='outlined' 
                type='number' 
                size='small'
                value={timer.seconds}
                onChange={handleInputChange('seconds')}
            />
            <div className={classes.buttons}>
                <Button
                    variant='outlined' 
                    color='primary'
                    onClick={handleTimer}>
                    {started ? 'Stop' : 'Start'}
                </Button>
                <Button
                    variant='outlined' 
                    color='primary'
                    onClick={clearTimer}>
                    Clear
                </Button>
            </div>
        </div>
    );
}

export default Timer;
