import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducers/root-reducer';
import App from './containers/App';
import { BrowserRouter } from 'react-router-dom';
import { createLogger } from 'redux-logger';

const middlewares = [thunk];
let composeEnhancers = compose;

if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger({
        collapsed: true,
    }));
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
}

const storeCons = composeWithDevTools(applyMiddleware(...middlewares))(createStore)(reducer);

const Root = () => (
    <Provider store={storeCons}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

export default Root;

