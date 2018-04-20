import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../../static/images/logo2.png';
import common from '../../utils/common';

export default class ProfileHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drop: false,
        };
    }

    componentDidMount() {
        const self = this;
        document.body.addEventListener("click",()=>{
            if (self.state.drop === 'block') {
                self.setState({
                    drop: '',
                })
            }
        })
    }

    toggleDropdown = () => {
        if (this.state.drop === 'block') {
            this.setState({ drop: this.state.drop === 'block' ? '' : 'block' });
        } else {
            this.setState({ drop: 'block' });
        }
    }

    logout = () => {
        common.eraseCookie('user');
        window.location.href = '/';
    }

    render() {
        return (
            <header className="profile-header">
                <div className="logo">
                    <Link to={'/propertyList'}>
                        <img className="imgLogo" alt="logo" src={logo}/>
                    </Link>
                </div>

                <div className="user flex">
                    <a className="dropbtn" onClick={this.toggleDropdown} >Menu
                        <i className="fa fa-angle-down dropbtn"> </i>
                    </a>
                    <div className={`dropdown-content ${this.state.drop === 'block' ? 'show' : 'hide' }`}>
                        <Link to={'/propertyList'}>Property List</Link>
                        <Link to={'/savedCityFilters'}>Email Alerts</Link>
                        <Link to={'/settings'}>Profile</Link>
                        <Link to={'/changePassword'}>Change password</Link>
                        <a onClick={this.logout}>Log out</a>
                    </div>
                </div>
            </header>
        );
    }
}
