import React, { Component } from 'react';
import * as Actions from '../actions/loginActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditMortgage from '../components/EditMortgage';

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(EditMortgage);
