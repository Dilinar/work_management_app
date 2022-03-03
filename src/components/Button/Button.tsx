/* Libraries */
import clx from 'classnames';
import {
    Button as MuiButton,
    ButtonProps,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    button: {
        width: '80px',
        borderColor: 'rgba(255, 87, 34, 0.5)',
        margin: '0.5rem 0.2rem'
    }
}));

export function Button(props: ButtonProps) {
    const classes = useStyles();

    return (
        <MuiButton
            {...props}
            className={clx(classes.button, { [props.className]: !!props.className })}
        >
            {props.children}
        </MuiButton>
    );
}

export default Button;
