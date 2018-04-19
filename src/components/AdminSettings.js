import React, {Component} from 'react';
import Footer from '../components/common/Footer';
import AdminTabs from './common/AdminTabs';
import jcf from '../static/vendor/jcf/js/jcf'
import '../static/scss/layout/viewProperty.scss';
import '../static/scss/layout/AdminSettings.scss';

class AdminSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cities: props.allCities,
            cityName: '',
            state: '',
            link: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            cities: nextProps.allCities,
        });
    }

    componentDidMount() {
        jcf.replaceAll();

        if (this.props.allCities.length === 0) {
            this.props.actions.getCities();
        }
    }

    componentWillMount() {
        const loginUser = this.props.user;
        if (!loginUser) {
            this.props.history.push({
                pathname: '/',
            });
            return;
        }
        if (localStorage.getItem('propertyObject') === null) {
            this.props.history.push({
                pathname: '/propertyList',
            });
            return;
        }
    }

    addCity = () => {
        const {cityName, link, state} = this.state;
        if (!cityName || !link || !state) {
            this.setState({
                error: 'All fields required',
            });
            return;
        }
        const data = {
            city: cityName,
            link,
            state,
        };
        this.props.actions.addCity(data, (res) => {
            if (!res.error && res.message === 'City Saved Successfully') {
                this.setState({
                    error: 'City added successfully',
                    cityName: '',
                    link: '',
                    state: '',
                });
            } else {
                this.setState({
                    error: res.error,
                });
            }

        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        return (
            <div className="view-property admin-settings">
                <div className="wrapper">

                    <div className="content no-margin">
                        <div>
                            <div className="edit-mode">
                                <div className="edit-tabs flex">
                                    <ul className="tabs">
                                        <li id="tab-1" className="active">Users list</li>
                                        <li id="tab-2">Manage cities</li>
                                    </ul>
                                    <AdminTabs
                                        state={this.state}
                                        addCity={this.addCity}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default AdminSettings;
