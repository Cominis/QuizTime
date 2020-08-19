import * as aTypes from './actionTypes';

export const updateAnswer = (questionIndex, value) => {
    return {
        type: aTypes.UPDATE_ANSWER,
        index: questionIndex,
        val: value,
    };
};

export const updateCategoryId = (categoryId) => {
    return {
        type: aTypes.UPDATE_CATEGORY_ID,
        categoryId: categoryId,
    };
};

export const updateQuestions = (questions) => {
    return {
        type: aTypes.UPDATE_QUESTIONS,
        questions: questions,
    };
};

export const initAnswers = (amount) => {
    return {
        type: aTypes.INIT_ANSWERS,
        amount: amount,
    };
};