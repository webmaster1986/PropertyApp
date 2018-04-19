import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from '../actions/userActions';
import { bindActionCreators } from 'redux';
import utils from '../utils/common';
import ProfileHeader from '../components/common/ProfileHeader';
import propertyListContainer from './propertyListContainer';
import ViewPropertyContainer from './ViewPropertyContainer';
import EditMortgageContainer from './EditMortgageContainer';
import SettingsContainer from './SettingsContainer';
import ChangePasswordContainer from './ChangePasswordContainer';
import AdminSettingsContainer from './AdminSettingsContainer';
import SavedSearchContainer from './SavedSearchContainer';
import SaveCityFiltersContainer from './SaveCityFiltersContainer';

const LoggedIn = ({user, actions}) => {

    if (!utils.isUser()) {
        return <Redirect to="/login" />;
    } else {
        actions.getAccount();
    }

    return (

        <div className="container">
            {user && <ProfileHeader loginUser={user}/> }
            <Switch>
                <Route path="/propertyList" component={propertyListContainer}/>
                <Route path="/viewProperty/:propertyId" component={ViewPropertyContainer}/>
                <Route path="/editMortgage" component={EditMortgageContainer}/>
                <Route path="/settings" component={SettingsContainer}/>
                <Route path="/changePassword" component={ChangePasswordContainer}/>
                <Route path="/adminsettings" component={AdminSettingsContainer}/>
                <Route path="/savedSearch" component={SavedSearchContainer}/>
                <Route path="/savedCityFilters" component={SaveCityFiltersContainer}/>
                <Route path="/" render={() => <Redirect to="/propertyList" />} />
            </Switch>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        user: state.login.user,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);
