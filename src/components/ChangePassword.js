import React, { Component } from 'react';
import CONST from '../utils/CONST';
import Button from './common/Button';

class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            newPassword: '',
            repeatPassword: '',
            error: '',
            success: '',
        };
    }

    ChangePassWord = (e) => {
        e.preventDefault();

        const password = this.state.password;
        const newPassword = this.state.newPassword;
        const repeatPassword = this.state.repeatPassword;
        if (!password.trim() || !newPassword.trim() || !repeatPassword.trim()) {
            this.setState({error: CONST.CHANGE_PWD_ALL_FIELDS_REQUIRED});
        } else if (newPassword !== repeatPassword) {
            this.setState({error: CONST.PASSWORD_NOT_MATCH});
        } else {
            const data = {
                currentPassword: password,
                newPassword: newPassword,
                confirmNewPassword: repeatPassword,
            };

            this.props.actions.changePassword(data, (res) => {
                if (res.error) {
                    const error = res.error.errors && res.error.errors[0] && res.error.errors[0].message;
                    this.setState({
                        error: error,
                    });
                } else {
                    this.setState({
                        password: '',
                        newPassword: '',
                        repeatPassword: '',
                        error: '',
                        success: CONST.PASSWORD_SUCCESS,
                    });
                }
            });
        }
    }

    onChange = (e) => {
        this.setState({ error: '', [e.target.name]: e.target.value, success: ''});
    }

    render() {
        const {password, newPassword, repeatPassword, error, success} = this.state;
        return (
            <div>
                <main className="flex">
                    <div className="reg-form">
                        <h2>Change Password</h2>
                        <form>
                            {error && <p style={{color: 'red', marginTop: 10, marginLeft: -25}}>{error}</p> }
                            {success && <p style={{color: 'green', marginTop: 10, marginLeft: -25}}>{success}</p> }
                            <input value={password} onChange={this.onChange} type="password" name="password" placeholder="Old Password" />
                            <input value={newPassword} onChange={this.onChange} type="password" name="newPassword" placeholder="New Password" />
                            <input value={repeatPassword} onChange={this.onChange} type="password" name="repeatPassword" placeholder="Repeat NewPassword" />
                            <Button width={120} onClick={this.ChangePassWord} text={'Submit'}/>
                        </form>
                    </div>
                </main>

            </div>
        );
    }
}


export default ChangePassword;
