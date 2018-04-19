import axios from 'axios';
import * as PROD from './ServiceUrl';
import CONST from '../utils/CONST';


export function userLogin(email, pwd, gType, scope, callback) {
    const bodyFormData = new URLSearchParams();
    bodyFormData.set('grant_type', gType);
    bodyFormData.set('client_id', CONST.CLIENT_ID);
    bodyFormData.set('client_secret', CONST.CLIENT_SECRET);
    bodyFormData.set('scope', scope);
    bodyFormData.set('username', email);
    bodyFormData.set('password', pwd);

    return (dispatch) => {
        axios({
            method: 'post',
            url: `${PROD.url}oauth/token`,
            data: bodyFormData,
        })
            .then((response) => {
                const data = response.data;
                dispatch({
                    type: 'USER_LOGIN',
                    data,
                });
                callback(data);
            }).catch((error) => {
                const data = error;
                dispatch({
                    type: 'USER_LOGIN',
                    data,
                });
                callback(data);
            });
    };
}

export function refreshLogin(token, cb) {
    const bodyFormData = new URLSearchParams();
    bodyFormData.set('grant_type', 'refresh_token');
    bodyFormData.set('client_id', CONST.CLIENT_ID);
    bodyFormData.set('client_secret', CONST.CLIENT_SECRET);
    bodyFormData.set('scope', 'read,write,trust');
    bodyFormData.set('refresh_token', token);

    return (dispatch) => {
        axios({
            method: 'post',
            url: `${PROD.url}oauth/token`,
            data: bodyFormData,
        })
            .then((response) => {
                const data = response.data;
                cb(data);
                dispatch({
                    type: 'USER_LOGIN',
                    data,
                });

            }).catch((error) => {
                const data = error;
                dispatch({
                    type: 'USER_LOGIN',
                    data,
                });
            });
    };
}

export function getCities() {
    return (dispatch) => {
        axios({
            method: 'get',
            url: `${PROD.url}getCities`,
        })
            .then((response) => {
                const data = response.data;
                dispatch({
                    type: 'ALL_CITIES',
                    data,
                });
            }).catch((error) => {
            });
    };
}

export function getPropertyTypes() {
    return (dispatch) => {
        axios({
            method: 'get',
            url: `${PROD.url}getPropertyTypes`,
        })
            .then((response) => {
                const data = response.data;
                dispatch({
                    type: 'ALL_PROPERTIES',
                    data,
                });
            }).catch((error) => {
            });
    };
}
