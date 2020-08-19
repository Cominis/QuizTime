import * as aTypes from '../actions/actionTypes';

const initialState = {
    questions: [],
    categoryId: 20,
    categoryName: '',
    answeredQuestions: [],
};

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case aTypes.UPDATE_ANSWER:
            const newAnsweredQuestions = state.answeredQuestions.slice();
            newAnsweredQuestions[action.index] = action.val;
            return {
                ...state,
                answeredQuestions: newAnsweredQuestions,
            }
        case aTypes.UPDATE_QUESTIONS:
            return {
                ...state,
                questions: action.questions,
            }
        case aTypes.UPDATE_CATEGORY_ID:
            return {
                ...state,
                categoryId: action.categoryId,
                categoryName: action.categoryName,
            }
        case aTypes.INIT_ANSWERS:
            return {
                ...state,
                answeredQuestions: new Array(action.amount).fill(null),
            }
    }
    return state;
};

export default quizReducer;