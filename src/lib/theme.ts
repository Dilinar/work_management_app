import { createTheme } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

export default createTheme({
    palette: {
        primary: {
            light: orange[800],
            main: orange[900],
            dark: '#0c380f',
            contrastText: '#fff'
        },
        secondary: {
            light: orange[800],
            main: orange[900],
            dark: '#0c380f',
            contrastText: '#fff'
        },
        text: {
            primary: orange[900], 
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 850,
            lg: 1280,
            xl: 1920
        }
    },
});
