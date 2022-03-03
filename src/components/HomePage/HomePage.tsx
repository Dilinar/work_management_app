/* Librareis */
import { 
    makeStyles, 
    Typography 
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        width: '50vw',
        paddingTop: '2rem',
        '& p': {
            textAlign: 'center',
            margin: '0.7rem',
        },
        '& h2': {
            textAlign: 'center',
        },
    },
}));

export function HomePage () {

    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Typography variant='h2'>
                The Work App
            </Typography>
            <Typography variant='body1'>
                Welcome!
            </Typography>
            <Typography variant='body1'>
                The app to make Your workday easier. 
                You will find various tolls here that might help You rise efficiency in completing tasks and keeping track of time.
            </Typography>
            <Typography variant='body1'>
                There is also a place to write down Your own workout. 
                Since we are all spending a lot of time sitting in front of the computer, 
                it is a good idea to incorporate some sports into our daily routine.
            </Typography>
            <Typography variant='body1'>
                Have a pleasant and productive day!
            </Typography>
        </div>
    );
}

export default HomePage;
