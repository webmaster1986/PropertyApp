import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from '../reducers/root-reducer';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger({
        collapsed: true,
    }));
}

const store = composeWithDevTools(applyMiddleware(...middlewares))(createStore)(reducer);

export default store