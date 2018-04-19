import React, { Component } from 'react';
import * as Actions from '../actions/userActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propertyList from '../components/propertyList';

const mapStateToProps = (state) => {
    return {
        propertiesByCity: state.userAction.propertiesByCity || {},
        allCities: state.userAction.allCities,
        user: state.login.user,
        selectedCity: state.userAction.selectedCity,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(propertyList);
