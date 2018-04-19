import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import utils from '../utils/common';
import LoginPage from './LoginContainer';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import EmailVerification from './EmailVerification';
import RegisterContainer from './RegisterContainer';

const LoggedOut = () => {

    if (utils.isUser()) {
        return <Redirect to="/propertyList" />;
    }

    return (
        <Switch>
            <Route exact path="/login" component={LoginPage}/>
            <Route path="/register" component={RegisterContainer}/>
            <Route path="/forgotPassword" component={ForgotPassword}/>
            <Route path="/resetPassword/:token?" component={ResetPassword}/>
            <Route path="/activate/:token?" component={EmailVerification}/>
            <Route path="/" render={() => <Redirect to="/login" />} />
        </Switch>
    );

};

export default LoggedOut;
