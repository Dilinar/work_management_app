/* Libraries */
import { 
    useState, 
    useEffect, 
    useRef 
} from 'react';
import { makeStyles } from '@material-ui/core';

/* Application files */
import Button from '../Button';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
    },
    display: {
        border: '1px solid #ff5722',
        borderRadius: '10px',
        padding: '5px',

    },
    buttons: {
        display: 'flex',
        flexFlow: 'column wrap',
        '@media (min-width: 360px)': {
            flexFlow: 'row wrap',
        },
    },
}));

export function Stoper() {

    const classes = useStyles();

    const [ stopper, setStopper ] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    } );
    const [ started, setStarted ] = useState(localStorage.getItem('stopperStarted') || false);
    const [ current, setCurrent ] = useState(parseInt(localStorage.getItem('stopperCurrent') as string) || 0);
    const [ id, setId ] = useState(null); 
    const currentRef = useRef(current);
    currentRef.current = current;  

    useEffect(() => {
        if(started === true || started === 'true') {
            setTimes();
            const id = setInterval(() => {
                setCurrent(current => current + 1);
                setTimes();
            }, 1000);
            setId(id);
        } else {
            clearInterval(id);
            setTimes();
        }
    }, [ started ]);

    function setTimes() {
        setStopper({
            hours: Math.floor(currentRef.current / 3600),
            minutes: Math.floor((currentRef.current % 3600) / 60),
            seconds: currentRef.current % 60,
        });
    }

    function handleStopper() {
        if((started === true || started === 'true')) {
            setStarted(false);
        } else {
            setStarted(true);
        }
    }

    function clearStopper() {
        setStarted(false);
        setCurrent(0);
        setStopper({
            hours: 0,
            minutes: 0,
            seconds: 0,
        });
    }

    useEffect(() => {
        localStorage.setItem('stopperCurrent', current.toString());
    }, [ current ]);

    useEffect(() => {
        localStorage.setItem('stopperStarted', started.toString());
    }, [ started ]);

    return (
        <div className={classes.root}>
            <h3>Stoper</h3>
            <div className={classes.display}>
                {stopper.hours < 10 ? `0${stopper.hours}` : stopper.hours}: 
                {stopper.minutes < 10 ? `0${stopper.minutes}` : stopper.minutes}: 
                {stopper.seconds < 10 ? `0${stopper.seconds}` : stopper.seconds}
            </div> 
            <div className={classes.buttons}>
                <Button
                    variant='outlined' 
                    color='primary'
                    onClick={handleStopper}>
                    {(started === true || started === 'true') ? 'Stop' : 'Start'}
                </Button>
                <Button
                    variant='outlined' 
                    color='primary'
                    onClick={clearStopper}>
                    Clear
                </Button>
            </div>
        </div>
    );

}

export default Stoper;
