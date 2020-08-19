import * as aTypes from './actionTypes';

export const setAmount = (amount) => {
    return {
        type: aTypes.SET_AMOUNT,
        amount: amount,
    };
};

export const setDifficulty = (difficulty) => {
    return {
        type: aTypes.SET_DIFFICULTY,
        difficulty: difficulty,
    };
};

export const setSettings = (amount, difficulty) => {
    return {
        type: aTypes.SET_SETTINGS,
        amount: amount,
        difficulty: difficulty,
    };
};

export const setToken = (token) => {
    return {
        type: aTypes.SET_TOKEN,
        token: token,
    };
};