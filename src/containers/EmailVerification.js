import React, { Component } from 'react';
import { connect } from 'react-redux';
import Service from '../utils/apiService';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import common from '../utils/common';

class EmailVerification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            defaultMsg: true,
            successMsg: false,
            errMsg: false,
            loader: true,
        };

        if (!props.match.params.token) {
            this.goToLogin();
        }
    }

    componentWillMount() {
        const token = this.props.match.params.token;
        if (token) {
            this.setState({token: token});
            console.log('token - - > ', token);
            Service.verifyEmail(token, (res) => {
                if (res.error) {
                    let message = res.error.errors[0].message;
                    if (!message) {
                        message = res.error.errors[0][0].message;
                    }
                    if (!message) {
                        message = 'There is a Problem while verifying your email address !!!';
                    }
                    this.setState({error: message, defaultMsg: false, loader: false});
                } else if (res && res.res && res.res.data && res.res.data.access_token) {
                    common.setCookie('user', JSON.stringify(res.res.data), 1);
                    common.setCookie('token', res.res.data.access_token);
                    setTimeout(() => {
                        window.location.href = '/propertyList';
                    }, 1000);
                    this.setState({successMsg: true, defaultMsg: false, loader: false});
                } else {
                    this.setState({error: 'There is a Problem while verifying your email address !!!', defaultMsg: false, loader: false});
                }
            });
        } else {
            this.setState({errMsg: true, successMsg: false, defaultMsg: false});
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.emailVerification === 'User Activated') {
            this.setState({successMsg: true, defaultMsg: false});
        } else {
            this.setState({errMsg: true, successMsg: false, defaultMsg: false});
        }
    }

    goToLogin = () => {
        this.props.history.push({
            pathname: '/',
        });
    }


    render() {
        return (
            <div className="container">

                <Header redirectLoginPage={this.goToLogin}/>

                {this.state.loader ?
                    <div className="loading">
                        <img src={require('../static/images/loader.png')} alt="loading.." className="searchComp-loader"/>
                    </div> :
                    <main className="flex">
                        {this.state.successMsg &&
                        <div className="reg-form">
                            <h2>Your Email has been verified successfully .</h2>
                            <form>
                                <Button text={'Go to Login'} onClick={this.goToLogin}/>
                            </form>
                        </div>
                        }
                        {this.state.defaultMsg &&
                        <div className="reg-form">
                            <h2>We are verifieing your mail , Please wait a moment .</h2>
                        </div>
                        }
                        {
                            this.state.error &&
                            <div className="reg-form">
                                <h2 style={{color: 'red'}}>{this.state.error}</h2>
                            </div>
                        }
                    </main>
                }
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        emailVerification: state.signUp.emailVerification,
    };
}


export default connect(mapStateToProps, null)(EmailVerification);
