import axios from 'axios';
import * as PROD from './ServiceUrl';


export function userSignup(email, pwd, fName, lName, timeZone, cb) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: `${PROD.url}account`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email: email,
                password: pwd,
                firstName: fName,
                lastName: lName,
                timeZone: timeZone,
                confirmPassword: pwd,
            },
        })
            .then((response) => {
                const data = response.data;
                dispatch({
                    type: 'USER_SIGNUP',
                    data,
                });
                cb({res: response});
            }).catch((error) => {
                const data = error;
                dispatch({
                    type: 'USER_SIGNUP',
                    data,
                });
                cb({ errors: error });
            });
    };
}

export function verifyEmail(token, cb) {
    return (dispatch) => {
        axios.patch(`${PROD.url}account/activate/${token}`, {},
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((response) => {
                const data = response.data.message;
                dispatch({
                    type: 'EMAIL_VERIFICATION',
                    data,
                });
                cb({ res: response });
            }).catch((error) => {
                cb({ error: error });
            });
    };
}

export function forgotPassword(email, cb) {
    return (dispatch) => {
        axios.post(`${PROD.url}account/forgotPassword`, {email},
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((response) => {
                cb({ res: response });
            }).catch((error) => {
                cb({ error: error.response.data });
            });
    };
}

export function resetPassword(data, cb) {
    return (dispatch) => {
        axios.post(`${PROD.url}account/resetPassword`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((response) => {
                cb({ res: response });
            }).catch((error) => {
                cb({ error: error.response.data });
            });
    };
}

