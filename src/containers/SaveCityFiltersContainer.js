import React, { Component } from 'react';
import * as Actions from '../actions/userActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SaveCityFilters from '../components/SaveCityFilters';

const mapStateToProps = (state) => {
    return {
        user: state.login.user,
        allCities: state.userAction.allCities || [],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveCityFilters);
