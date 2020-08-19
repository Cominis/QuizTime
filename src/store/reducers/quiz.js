import * as aTypes from '../actions/actionTypes';

const initialState = {
    answeredQuestions: [],
    amount: 0
};

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case aTypes.INSERT_ANSWER:
            const newAnsweredQuestions = state.answeredQuestions.slice();
            newAnsweredQuestions[action.index] = action.val;
            return {
                ...state,
                answeredQuestions: newAnsweredQuestions,
            }
        case aTypes.INIT_ANSWERS:
            return {
                ...state,
                amount: action.amount,
                answeredQuestions: new Array(action.amount).fill(null),
            }
    }
    return state;
};

export default quizReducer;