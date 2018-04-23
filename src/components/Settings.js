import React, {Component} from 'react';
import common from '../utils/common';
import CONST from '../utils/CONST';
import Service from '../utils/apiService';
import Button from './common/Button';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: (props.user && props.user.first_name) || '',
            lastName: (props.user && props.user.last_name) || '',
            error: '',
            success: '',
        };

    }

    componentWillMount() {
        const loginUser = this.props.user;
        if (!loginUser) {
            this.props.history.push({
                pathname: '/',
            });
            return;
        }
        Service.getTimezone().then((res) => {
            this.setState({
                timeZone: res.data.timezone,
            });
        });
    }

    updateProfile = (e) => {
        e.preventDefault();
        const {lastName, timeZone, firstName} = this.state;

        if (!firstName.trim() || !lastName.trim() || !timeZone.trim()) {
            this.setState({error: CONST.CHANGE_PWD_ALL_FIELDS_REQUIRED});
        } else {
            const data = {
                token: this.props.user.sessionKey,
                firstName,
                lastName,
                timeZone,
            };
            Service.updateAccount(data, (res) => {
                if (res.error) {
                    const error = res.error.errors && res.error.errors[0] && res.error.errors[0].message;
                    this.setState({
                        error: error,
                    });
                } else {
                    this.props.actions.refreshLogin(this.props.user.refresh_token, (res) => {
                        if (res && res.access_token) {
                            common.setCookie('user', JSON.stringify(res), 1);
                            common.setCookie('token', res.access_token);
                        }
                    });
                    this.setState({
                        error: '',
                        success: CONST.UPDATE_ACCOUNT_SUCCESS,
                    });
                }
            });

        }
    }

  onChange = (e) => {
      this.setState({error: '', [e.target.name]: e.target.value, success: ''});
  }

  render() {
      const {lastName, firstName, error, success} = this.state;
      return (
          <div>
              <main className="flex">
                  <div className="reg-form">
                      <h2>Update Profile</h2>
                      <form>
                          {error && <p style={{color: 'red', marginTop: 10, marginLeft: -25}}>{error}</p>}
                          {success && <p style={{color: 'green', marginTop: 10, marginLeft: -25}}>{success}</p> }
                          <input value={firstName} onChange={this.onChange} type="text" name="firstName" placeholder="Firstname"/>
                          <input value={lastName} onChange={this.onChange} type="text" name="lastName" placeholder="Lastname"/>
                          <Button width={120} onClick={this.updateProfile} text={'Submit'}/>
                      </form>
                  </div>
              </main>
          </div>
      );
  }
}


export default Settings;
