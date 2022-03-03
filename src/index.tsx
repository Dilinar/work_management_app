/* Libraries */
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

/* Types */
import { ReduxState } from './types/Redux';

/* Application files */
import App from './components/App/App';
import theme from './lib/theme';
import reducers from './reducers';

const composer = composeWithDevTools({});
const store: Store<ReduxState> = createStore(reducers, {}, composer());

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={responsiveFontSizes(theme)}>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);
