import axios from 'axios';
import * as PROD from './ServiceUrl';
import common from '../../utils/common';


export function getPropertyByCity(city) {
    return (dispatch) => {
        axios({
            method: 'get',
            url: `${PROD.url }properties?city=${city}`,
            headers: {
                ...common.authorization(),
            },
        })
            .then((response) => {
                const data = response.data.pagedList;
                const filteredData = data.filter((property) => {
                    return property.grossAnnualIncome !== 'N/A' && property.grossAnnualIncome !== '-' && property.grossAnnualIncome !== '$0' && property.grossAnnualIncome !== '0' && property.grossAnnualIncome !== null && property.price !== '0';
                });
                console.log('data = ', data.length);
                console.log('filteredData = ', filteredData);
                const badResults = data.length - filteredData.length;
                const percentBad = badResults / data.length;
                console.log('percentBad = ', Math.round(percentBad * 100));
                dispatch({
                    type: 'PROPERTY_BY_CITY',
                    data: {
                        city: city,
                        data: filteredData,
                    },
                });
            }).catch((error) => {
                const data = error;
                // dispatch({
                //   type: 'USER_LOGIN',
                //   data,
                // });
            });
    };
}

export function getCities() {
    return (dispatch) => {
        axios({
            method: 'get',
            url: `${PROD.url}cities`,
            headers: {
                ...common.authorization(),
            },

        })
            .then((response) => {
                const data = response && response.data || [];
                dispatch({
                    type: 'ALL_CITIES',
                    data,
                });
            }).catch((error) => {});
    };
}

export function setCity(data) {
    return {
        type: 'SET_CITY',
        data: data,
    };
}

export function addCity(data, cb) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: `${PROD.url }addCity`,
            data: data,
        })
            .then((response) => {
                if (response.data.message === 'City Saved Successfully') {
                    dispatch({type: 'ADD_CITY', data: data.city});
                }
                cb(response.data);
            }).catch((error) => {
            });
    };
}

export function updateAccount(data, cb) {
    return (dispatch) => {
        axios.put(`${PROD.url}account`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    ...common.authorization(),
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

export function getAccount(data, cb) {
    return (dispatch) => {
        axios.get(`${PROD.url}account`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    ...common.authorization(),
                },
            }
        )
            .then((response) => {

            }).catch((error) => {
                if (error.response && error.response.data && error.response.data.error === 'invalid_token') {
                    common.eraseCookie('user');
                    common.eraseCookie('token');
                    window.location.href = '/';
                }
            });
    };
}

export function changePassword(data, cb) {
    return (dispatch) => {
        axios.put(`${PROD.url}account/updatePassword`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    ...common.authorization(),
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

