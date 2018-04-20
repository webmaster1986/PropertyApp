import axios from 'axios';
import * as PROD from '../redux/actions/ServiceUrl';
import common from '../utils/common';

const userSignup = (email, pwd, fName, lName, timeZone, cb) => {
    axios({
        method: 'post',
        url:
`${PROD.url}account`,
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
            cb({res: response});
        }).catch((error) => {
            cb({ errors: error });
        });
};

const verifyEmail = (token, cb) => {
    axios.patch(
        `${PROD.url}account/activate/${token}`
        , {},
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

const forgotPassword = (email, cb) => {
    axios.post(
        `${PROD.url}account/forgotPassword`
        , {email},
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

const resetPassword = (data, cb) => {
    axios.post(
        `${PROD.url}account/resetPassword`
        , data,
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

const updateAccount = (data, cb) => {
    axios.put(
        `${PROD.url}account`
        , data,
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

const changePassword = (data, cb) => {
    axios.put(
        `${PROD.url}account/updatePassword`
        , data,
        {
            headers: {
                'Content-Type': 'application/json',
                ...common.authorization(),
            },
        }
    )
        .then((response) => {
            cb({res: response});
        }).catch((error) => {
            cb({error: error.response.data});
        });
};

const getProperties = (propertyId, cb) => {
    axios.get(
        `${PROD.url}properties/${propertyId}/filters`,
        {
            headers: {
                'Content-Type': 'application/json',
                ...common.authorization(),
            },
        }
    )
        .then((response) => {
            cb({res: response});
        }).catch((error) => {
            cb({error: error});
        });
};

const getPropertyById = (propertyId, cb) => {
    axios.get(
        `${PROD.url}properties/${propertyId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                ...common.authorization(),
            },
        }
    )
        .then((response) => {
            cb({res: response});
        }).catch((error) => {
            cb({error: error});
        });
};

const createOrUpdateProperty = (propertyId, data, cb) => {
    axios.post(
        `${PROD.url}/properties/${propertyId}/filters`
        , data,
        {
            headers: {
                'Content-Type': 'application/json',
                ...common.authorization(),
            },
        }
    )
        .then((response) => {
            cb({res: response});
        }).catch((error) => {
            cb({error: error.response.data});
        });
};

const getCityFilters = (city, cb) => {
    axios.get(
        `${PROD.url}cities/${city}/filters`,
        {
            headers: {
                'Content-Type': 'application/json',
                ...common.authorization(),
            },
        }
    )
        .then((response) => {
            cb({res: response});
        }).catch((error) => {
            cb({error: error});
        });
};

const createOrUpdateCityFilters = (city, data, cb) => {
    axios.post(
        `${PROD.url}cities/${city}/filters`, data,
        {
            headers: {
                'Content-Type': 'application/json',
                ...common.authorization(),
            },
        }
    )
        .then((response) => {
            cb({res: response});
        }).catch((error) => {
            cb({error: error});
        });
};

const getTimezone = () => {
    return axios.get(
        'https://ipapi.co/json/',
        {
            headers: {
                'Content-Type': 'application/json',
                ...common.authorization(),
            },
        }
    );
};

const apiService = {
    updateAccount,
    changePassword,
    getCityFilters,
    createOrUpdateCityFilters,
    userSignup,
    verifyEmail,
    forgotPassword,
    resetPassword,
    getProperties,
    getPropertyById,
    createOrUpdateProperty,
    getTimezone,
};

export default apiService;