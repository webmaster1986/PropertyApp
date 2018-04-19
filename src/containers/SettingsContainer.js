import React, {Component} from 'react';
import * as Actions from '../actions/loginActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Settings from '../components/Settings';

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


export default connect(mapStateToProps, mapDispatchToProps)(Settings);