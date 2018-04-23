import { connect } from 'react-redux';
import ViewProperty from '../components/ViewProperty';

const mapStateToProps = (state) => {
    return {
        user: state.login.user,
    };
};

export default connect(mapStateToProps, null)(ViewProperty);
