import * as Actions from '../redux/actions/userActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SavedSearch from '../components/SavedSearch';

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

export default connect(mapStateToProps, mapDispatchToProps)(SavedSearch);
