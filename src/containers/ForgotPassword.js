import React, { Component } from 'react';
import common from '../utils/common';
import Service from '../utils/apiService';
import Header from '../components/common/Header';
import Button from '../components/common/Button';

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: '',
        };
    }

    sendEmail = (e) => {
        e.preventDefault();
        if (common.emailValidation(this.state.email)) {
            Service.forgotPassword(this.state.email, (res) => {
                if (res.error) {
                    let message = res.error.errors[0].message;
                    if (!message) {
                        message = res.error.errors[0][0].message;
                    }
                    this.setState({error: message});
                } else {
                    alert('Please check your inbox. You would get reset password link.', () => {
                        this.props.history.push({
                            pathname: '/',
                        });
                    });
                }
            });
        } else {
            this.setState({error: 'Please enter valid email'});
        }
    }

    redirectLoginPage = () => {
        this.props.history.push({
            pathname: '/',
        });
    }

    enteredEmail = (e) => {
        this.setState({email: e.target.value, error: ''});
    }

    render() {
        const { error } = this.state;
        return (
            <div className="container">
                <Header redirectLoginPage={this.redirectLoginPage}/>
                <main className="flex">
                    <div className="reg-form">
                        <h2>Forgot your password</h2>
                        <label>Enter your valid email address</label>
                        <form>
                            {error && <p style={{color: 'red', marginTop: 10, marginLeft: -25}}>{error}</p>}
                            <input value={this.state.email} onChange={this.enteredEmail} type="text" name="" placeholder="Name" />
                            <Button text={'OK'} onClick={this.sendEmail}/>
                            <p>Press ENTER</p>
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}

export default ForgotPassword;