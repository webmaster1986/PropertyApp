import React, { Component } from 'react';
import CONST from '../utils/CONST';
import Footer from './common/Footer';
import Header from './common/Header';
import Button from './common/Button';
import common from '../utils/common';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grant_type: 'password',
            scope: 'read,write,trust',
            username: '',
            password: '',
            error: '',
        };
    }

    componentWillMount() {
        const loginUser = this.props.user;
        if (loginUser && loginUser.access_token) {
            this.props.history.push({
                pathname: '/propertyList',
            });
        }
    }

    redirectRegisterPage = () => {
        this.props.history.push({
            pathname: '/register',
        });
    }

    redirectForgotPasswordPage = () => {
        this.props.history.push({
            pathname: '/forgotPassword',
        });
    }

    login = (e) => {
        e.preventDefault();
        const un = this.state.username;
        const pwd = this.state.password;
        if (!un.trim() || !pwd.trim()) {
            this.setState({error: CONST.LOGIN_ERROR_REQUIRED});
        } else {
            this.setState({error: ''});
            const uId = this.state.username;
            const pwd = this.state.password;
            const scope = this.state.scope;
            const gType = this.state.grant_type;

            this.props.actions.userLogin(uId, pwd, gType, scope, (res) => {
                if (res && res.access_token) {
                    common.setCookie('user', JSON.stringify(res), 1);
                    common.setCookie('token', res.access_token);
                    this.props.history.push({
                        pathname: '/propertyList',
                    });
                } else {
                    this.setState({error: CONST.LOGIN_ERROR_WRONG_DATA});
                }
            });
        }
    }

    onChange = (e) => {
        this.setState({ error: '', [e.target.name]: e.target.value});
    }

    render() {
        const {username, password, error} = this.state;
        return (
            <div className="container">
                <Header redirectRegisterPage={this.redirectRegisterPage}/>

                <main className="flex">
                    <div className="reg-form">
                        <h2>Login</h2>
                        <form>
                            {error && <p style={{color: 'red', marginTop: 10, marginLeft: -25}}>{error}</p> }
                            <input value={username} onChange={this.onChange} type="text" name="username" placeholder="Email" />
                            <input value={password} onChange={this.onChange} type="password" name="password" placeholder="Password" />
                            <Button width={120} onClick={this.login} text={'Submit'}/>
                            <p onClick={this.redirectForgotPasswordPage}>forgot password</p>
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}


export default Login;
