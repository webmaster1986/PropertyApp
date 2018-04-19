import React from 'react';
import {
    Route,
} from 'react-router-dom';
import utils from '../utils/common';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';
import imgBackground from '../static/images/background.png';
import '../static/scss/style.css'
import '../components/common/Button.css'

const backGround = {
    backgroundImage: `url(${imgBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center bottom',
    backgroundSize: '75%',
};

const App = () => (
    <div style={{height: '100%', width: '100%', ...backGround}}>
        {
            utils.isUser() ?
                <Route path="/" component={LoggedIn} /> :
                <Route path="/" component={LoggedOut} />
        }
    </div>
);
export default App;