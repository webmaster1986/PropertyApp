import signUp from './signUp';
import login from './login';
import userAction from './userAction';
import common from '../../utils/common';

import {
    combineReducers,
} from 'redux';

const appReducer = combineReducers({
    signUp,
    login,
    userAction,
});

let user = common.getCookie('user');
if (user) {
    user = JSON.parse(user);
}

const initialState = {
    signUp: {},
    login: {
        user,
    },
    userAction: {},
};

const rootReducer = (state = initialState, action) => {
    return appReducer(state, action);
};

export default rootReducer;