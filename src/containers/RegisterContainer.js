import React, {Component} from 'react';
import Service from '../utils/apiService';
import Header from '../components/common/Header';
import Button from '../components/common/Button';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName: '',
            email: '',
            timeZone: '0',
            password: '',
            repeatPassword: '',
            unErrMsg: false,
            errMsg: '-- You cant leave Password empty --',
            unErrMsg2: false,
            errMsg2: '-- Password does not match the confirm password. --',
            step: 0,
        };
    }


    componentWillMount() {
        if (this.props.location.state === undefined) {
            console.log('empty');
        } else {
            const userDetails = this.props.location.state.userDetails;
            this.setState({name: userDetails.name, email: userDetails.email, password: userDetails.password});
        }
        Service.getTimezone().then((res) => {
            this.setState({
                timeZone: res.data.timezone,
            });
        });
    }

    redirectLoginPage = () => {
        this.props.history.push({
            pathname: '/',
        });
    }

    handleRedirect = (e) => {
        e.preventDefault();
        const { step, name, timeZone, email, password, repeatPassword} = this.state;
        const first = name && name.split(' ')[0];
        const last = (name && name.split(' ')[1]) || '';
        if (step === 0) {
            if (first.trim() === '' || last.trim() === '') {
                this.setState({
                    error: '-- You must enter your firstname and lastname --',
                });
            } else {
                this.setState({
                    step: 1,
                });
            }
        } else if (step === 1) {
            // eslint-disable-next-line
            const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (email.trim() === '' || !regExp.test(email)) {
                this.setState({
                    error: '-- You must enter valid email --',
                });
            } else {
                this.setState({
                    step: 2,
                });
            }
        } else if (step === 2) {
            if (password.trim() === '') {
                this.setState({
                    error: '-- You must enter a password --',
                });
            } else if (password.trim().length < 8) {
                this.setState({
                    error: '-- Password must contain at least 8 characters --',
                });
            } else {
                this.setState({
                    step: 3,
                });
            }
        } else if (step === 3) {
            if (repeatPassword.trim() !== password.trim()) {
                this.setState({
                    error: '-- Passwords do not match --',
                });
            } else {
                Service.userSignup(email, password, first, last, timeZone,
                    (res) => {
                        if (res.errors) {
                            const resError = res.errors.response;
                            const registrationError = resError && resError.data && resError.data.errors ?
                                resError.data.errors : [];
                            if (registrationError && registrationError.length > 0) {
                                this.setState({
                                    step: 1,
                                    email: '',
                                    error: registrationError[0].message,
                                });
                            }
                        } else {
                            this.setState({
                                step: 4,
                            });
                        }
                    });
            }
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: '',
        });
    }

    render() {
        const {step, error} = this.state;

        if (step === 4) {
            return (<div className="container">
                <Header redirectLoginPage={this.redirectLoginPage}/>

                <main className="flex">
                    <div className="reg-form step-5">
                        <h3>You're all set.<br/>Confirm your email and you're good to go!</h3>
                    </div>
                </main>
            </div>);
        }

        return (
            <div className="container">
                <Header redirectLoginPage={this.redirectLoginPage}/>

                <main className="flex">

                    <div className="reg-form">
                        {
                            step === 0 && [<h2 key={1}>Looks like you're new here!</h2>,
                                <label key={2}>What's your first name?</label>]
                        }
                        {
                            step === 1 && [<h2 key={1}>Hey {this.state.name} {this.state.lastName}, nice to meet you.</h2>,
                                <label key={2}>Which email address shall we use?</label>,
                                <label key={3} className="small">Dont worry we won't spam you</label>]
                        }
                        {
                            step === 2 && [<h2 key={1}>Got it.</h2>, <label key={2}>Choose a password (at least 8 characters)</label>]
                        }
                        {
                            step === 3 && [<h2 key={1}>Looks good.</h2>, <label key={2}>Repeat the password</label>]
                        }
                        <form>
                            {error && <p style={{color: 'red', marginTop: 10, marginLeft: -25}}>{error}</p>}
                            {
                                step === 0 &&
                                <input value={this.state.name} onChange={this.onChange} type="text" name="name" placeholder="Name" autoFocus={true}/>
                            }
                            {
                                step === 1 && <input value={this.state.email} onChange={this.onChange} type="text" name="email"
                                    placeholder="Your email address" autoFocus={true}
                                />
                            }
                            {
                                step === 2 &&
                                <input placeholder="Password" value={this.state.password} onChange={this.onChange} type="password"
                                    name="password" autoFocus={true}
                                />
                            }
                            {
                                step === 3 &&
                                <input placeholder="Password" value={this.state.repeatPassword} onChange={this.onChange} type="password"
                                    name="repeatPassword" autoFocus={true}
                                />
                            }
                            <Button text={'OK'} onClick={this.handleRedirect} />
                            <p>Press ENTER</p>
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}

export default Register;
