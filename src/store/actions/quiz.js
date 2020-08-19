import * as aTypes from './actionTypes';

export const insertAnswer = (questionIndex, value) => {
    return {
        type: aTypes.INSERT_ANSWER,
        index: questionIndex,
        val: value,
    };
};

export const initAnswers = (amount) => {
    return {
        type: aTypes.INIT_ANSWERS,
        amount: amount,
    };
};