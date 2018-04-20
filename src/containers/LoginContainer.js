import React, { Component } from 'react';
import * as Actions from '../redux/actions/loginActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from '../components/Login';

const mapStateToProps = (state) => {
    return {
        user: state.login.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
