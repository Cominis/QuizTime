import quizReducer from './reducers/quiz';
import settingsReducer from './reducers/settings';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

const rootReducer = combineReducers({
    quiz: quizReducer,
    settings: settingsReducer,
});

const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger)));

export default store;