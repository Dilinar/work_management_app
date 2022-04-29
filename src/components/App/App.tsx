/* Libraries */
import { 
    BrowserRouter as Router, 
    Link as RouterLink,
    NavLink,
    Route, 
    Switch
} from 'react-router-dom';
import { 
    Link,
    LinkProps,
    makeStyles, 
    Breadcrumbs, 
    Typography,
} from '@material-ui/core';

/* Application files */
import AddTask from '../AddTask';
import Clock from '../Clock';
import Timer from '../Timer';
import Stoper from '../Stoper';
import ErrorPage from '../ErrorPage';
import HomePage from '../HomePage';
import WorkoutCalender from '../WorkoutCalender';
import Button from '../Button';
import Background from '../../assets/images/background.png';



const useStyles = makeStyles((theme) => ({
    breadcrumbs: {
        width: '100vw',
        position: 'fixed',
        zIndex: 99, 
        padding: '0.3rem',
        backgroundColor: '#000000',
        [theme.breakpoints.up('md')]: {
            borderBottom: '1px solid #ff5722',
        }
    },
    componentsLayout: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#000000',
        backgroundImage: `url(${Background})`,
        backgroundSize: '150vw',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPositionY: 70,
        [theme.breakpoints.up('sm')]: {
            backgroundPositionY: 70,
            backgroundSize: '100vw',
        },
        [theme.breakpoints.up('md')]: {
            backgroundPositionY: 35,
        }
    },
    navList: {
        display: 'flex',
        width: '100vw',
        marginTop: '24px',
        position: 'fixed',
        zIndex: 99,
        backgroundColor: '#000000',
        borderBottom: '1px solid #ff5722',
        listStyle: 'none',
        '& a': {
            textDecoration: 'none',
        },
        [theme.breakpoints.up('md')]: {
            flexFlow: 'column wrap',
            justifyContent: 'center',
            alignItems: 'center',
            width: '25vw',
            minHeight: '100vh',
            borderBottom: 'none',
            backgroundColor: 'transparent',
        },
    },
    button: {
        width: 'fit-content',
    },
    mainComponent: {
        display: 'flex',
        justifyContent: 'center',
        width: '50vw',
        minHeight: '100vh',
        paddingTop: '76px',
        borderRight: '1px solid #ff5722',
        [theme.breakpoints.up('md')]: {
            minHeight: '90vh',
            borderLeft: '1px solid #ff5722',
            marginLeft: '25vw',
        },
    },
    timeDisplays: {
        width: '50vw',
        marginTop: '76px',
        '@media (min-height: 540px)': {
            position: 'fixed',
            marginLeft: '50vw',
        },
        [theme.breakpoints.up('md')]: {
            width: '25vw',
            marginLeft: '75vw',
        },
    },
}));

interface LinkRouterProps extends LinkProps {
    to: string;
    replace?: boolean;
}

const breadcrumbNameMap: { [key: string]: string } = {
    '/todo': 'Todo List',
    '/workout': 'Workout Calender',
};

const LinkRouter = (props: LinkRouterProps) => <Link {...props} component={RouterLink} />;

export function App() {

    const classes = useStyles();
 
    return (
        <Router basename='/work_management_app'>
            <Route>
                {({ location }) => {
                    const pathnames = location.pathname.split('/').filter((x) => x);

                    return (
                        <div className={classes.breadcrumbs}>
                            <Breadcrumbs>
                                <LinkRouter color='inherit' to='/'>
                                Home
                                </LinkRouter>
                                {pathnames.map((value, index) => {
                                    const last = index === pathnames.length - 1;
                                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                                    return last ? (
                                        <Typography color='textPrimary' key={to}>
                                            {breadcrumbNameMap[to]}
                                        </Typography>
                                    ) : (
                                        <LinkRouter color='inherit' to={to} key={to}>
                                            {breadcrumbNameMap[to]}
                                        </LinkRouter>
                                    );
                                })}
                            </Breadcrumbs>
                        </div>
                    );
                }}
            </Route>
            <div className={classes.componentsLayout}>
                <nav>
                    <ul className={classes.navList}>
                        <li>
                            <NavLink to='/todo'>
                                <Button className={classes.button}
                                    variant='outlined' 
                                    color='primary'
                                    type='submit'>
                                    To Do List
                                </Button>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/workout'>
                                <Button className={classes.button}
                                    variant='outlined' 
                                    color='primary'
                                    type='submit'>
                                    Workout
                                </Button>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <section className={classes.mainComponent}>
                    <Switch>
                        <Route path='/' exact component={HomePage} />
                        <Route path='/todo' component={AddTask} />
                        <Route path='/workout' component={WorkoutCalender} />
                        <Route component={ErrorPage}  />
                    </Switch>
                </section> 
                <section className={classes.timeDisplays}>
                    <Clock />
                    <Timer />
                    <Stoper />
                </section>  
            </div>
        </Router> 
    );
}

export default App;
