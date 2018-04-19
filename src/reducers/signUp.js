const initialState = {};

export default function signUp(state = initialState, action) {
    switch (action.type) {

        case 'USER_SIGNUP':
            return {
                ...state,
                signUpResponse: action.data,
            };

        case 'EMAIL_VERIFICATION':
            return {
                ...state,
                emailVerification: action.data,
            };

        default:
            return state;
    }
}