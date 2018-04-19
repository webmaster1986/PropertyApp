import React, { Component } from 'react';
import Service from '../utils/apiService';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';

class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            confirmNewPassword: '',
            error: '',
        };

        if (!props.match.params.token) {
            this.redirectLoginPage();
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {newPassword, confirmNewPassword} = this.state;
        let error = '';
        if (newPassword.length <= 7) {
            error = 'Password should be at least 8 characters';
        } else if (newPassword !== confirmNewPassword) {
            error = 'New password does not match with confirm password';
        }

        if (error) {
            this.setState({
                error,
            });
        } else {
            Service.resetPassword({token: this.props.match.params.token, newPassword, confirmNewPassword}, (res) => {
                if (res.error) {
                    let message = res.error.errors[0].message;
                    if (!message) {
                        message = res.error.errors[0][0].message;
                    }
                    this.setState({error: message});
                } else {
                    alert('Your password been updated successfully.', () => {
                        this.props.history.push({
                            pathname: '/',
                        });
                    });
                }
            });
        }

    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value, error: ''});
    }

    redirectLoginPage = () => {
        this.props.history.push({
            pathname: '/',
        });
    }

    render() {
        return (
            <div style={{height: '100%', width: '100%'}} className="container">
                <Header redirectLoginPage={this.redirectLoginPage}/>
                <main className="flex">
                    <div className="reg-form">
                        <h2>Create new password</h2>
                        <label>Choose a password (at least 8 characters)</label>
                        <form>
                            {this.state.error &&
                                <p style={{color: 'red', marginTop: 10, marginLeft: -25}}>{this.state.error}</p>
                            }
                            <input type="password" className="register-text-field-style" value={this.state.newPassword} name="newPassword" onChange={this.onChange} placeholder="Password" />
                            <input type="password" className="register-text-field-style" value={this.state.confirmPassword} name="confirmNewPassword" onChange={this.onChange} placeholder="Confirm password" />
                            <Button text={'OK'} onClick={this.onSubmit} />
                            <p>Press ENTER</p>
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}

export default ResetPassword;
