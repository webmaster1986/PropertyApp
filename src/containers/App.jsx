import React from 'react';
import {
    Route,
} from 'react-router-dom';
import utils from '../utils/common';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';
import '../static/scss/style.css'
import '../components/common/Button.css'

const App = () => (
    <div style={{height: '100%', width: '100%' }}>
        {
            utils.isUser() ?
                <Route path="/" component={LoggedIn} /> :
                <Route path="/" component={LoggedOut} />
        }
    </div>
);
export default App;