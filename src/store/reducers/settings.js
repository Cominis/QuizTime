import * as aTypes from '../actions/actionTypes';

const initialState = {
    difficulty: 'any',
    amount: 10,
    token: '',
};

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case aTypes.SET_SETTINGS:
            return {
                ...state,
                amount: action.amount,
                difficulty: action.difficulty,
            }
        case aTypes.SET_DIFFICULTY:
            return {
                ...state,
                difficulty: action.difficulty,
            }
        case aTypes.SET_AMOUNT:
            return {
                ...state,
                amount: action.amount,
            }
        case aTypes.SET_TOKEN:
            return {
                ...state,
                token: action.token,
            }
    }
    return state;
};

export default settingsReducer;