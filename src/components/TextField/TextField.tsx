import clx from 'classnames';
import {
    TextField as MuiTextField,
    TextFieldProps,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    textField: {
        '& label.Mui-focused': {
            color: 'rgb(7, 104, 4)',
        },
        '& label': {
            color: '#ff5722',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'rgb(7, 104, 4)',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgba(255, 87, 34, 0.5)',
            },
            '&:hover fieldset': {
                borderColor: '#ff5722',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'rgb(7, 104, 4)',
            },
        },
        margin: '0.5rem',
    },
}));


export function TextField(props: TextFieldProps) {
    const classes = useStyles();

    return (
        <MuiTextField
            {...props}
            className={clx(classes.textField)}
        >
            {props.children}
        </MuiTextField>
    );
}

export default TextField;
