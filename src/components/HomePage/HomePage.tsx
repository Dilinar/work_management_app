/* Librareis */
import { 
    useState,
    useEffect
} from 'react';
import { 
    makeStyles, 
    Typography 
} from '@material-ui/core';


/* Application Files */
import TextField from '../TextField';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexFlow: 'column wrap',
        width: '50vw',
        paddingTop: '2rem',
        '& p': {
            textAlign: 'center',
            margin: '0.7rem',
        },
        '& h2': {
            textAlign: 'center',
        }
    },
}));

export function HomePage () {

    const classes = useStyles();

    const [ text, setText ] = useState((localStorage.getItem('notepad') as string) || '');

    function handleText(e: React.ChangeEvent<HTMLInputElement>) {
        setText(e.target.value);
    }

    useEffect(() => {
        localStorage.setItem('notepad', text.toString());
    }, [ text ]);
    console.log(`Notepad text:${text}`);
    return (
        <div className={classes.root}>
            <Typography variant='h2'>
                Notepad
            </Typography>
            <TextField
                id='outlined-basic' 
                label='notes' 
                variant='outlined' 
                type='text' 
                size='small'
                value={text} 
                onChange={handleText}
                multiline
            />
        </div>
    );
}

export default HomePage;
