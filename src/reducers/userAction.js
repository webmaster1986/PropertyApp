const initialState = {};

export default function userAction(state = initialState, action) {
    switch (action.type) {

        case 'PROPERTY_BY_CITY':
            return {
                ...state,
                propertiesByCity: {
                    ...state.propertiesByCity,
                    [action.data.city]: action.data.data,
                },
            };

        case 'ALL_CITIES':
            return {
                ...state,
                allCities: action.data,
            };

        case 'SET_CITY':
            return {
                ...state,
                selectedCity: action.data,
            };

        case 'ADD_CITY': {
            const cities = state.allCities || [];
            cities.push(action.data);
            return {
                ...state,
                allCities: cities,
            };
        }


        default:
            return state;
    }
}