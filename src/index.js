import React from 'react'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import { createLogger } from 'redux-logger';
import store from './Redux/store'
import App from './containers/App';
import reducer from './reducers/root-reducer';

const middlewares = [thunk];
let composeEnhancers = compose;

if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger({
        collapsed: true,
    }));
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
}

const storeCons = composeWithDevTools(applyMiddleware(...middlewares))(createStore)(reducer);

render(
    <Provider store={storeCons}>
        <Router>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById( 'root' )
)


