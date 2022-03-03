/* Librareis */
import { useState }from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 'fit-content',
        border: '1px solid #ff5722',
        borderRadius: '10px',
        padding: '5px',
        margin: '1rem auto',
        fontSize: '1.4rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '2rem',
        },
    },
}));

export function Clock() {

    const classes = useStyles();

    const [ clock, setClock ] = useState({
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds(),
        day: new Date().getDate(),
        month: new Date().getMonth()+1,
        year: new Date().getFullYear()
    });

    setTimeout(
        () => setClock({
            hours: new Date().getHours(),
            minutes: new Date().getMinutes(),
            seconds: new Date().getSeconds(),
            day: new Date().getDate(),
            month: new Date().getMonth()+1,
            year: new Date().getFullYear()
        }),
        1000
    );

    return (
        <div className={classes.root}>
            <div>
                {clock.hours < 10 ? `0${clock.hours}` : clock.hours} : {clock.minutes < 10 ? `0${clock.minutes}` : clock.minutes} : {clock.seconds < 10 ? `0${clock.seconds}` : clock.seconds}
            </div>
            <div>
                {clock.day < 10 ? `0${clock.day}` : clock.day}.{clock.month < 10 ? `0${clock.month}` : clock.month}.{clock.year}
            </div>    
        </div>
    );
        
}

export default Clock;
