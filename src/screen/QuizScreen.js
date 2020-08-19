import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView,
    StyleSheet
} from "react-native";
import { requestQuestionsFromCategory, requestTokenReset } from '../api/api';
import ProgressIndicator from '../component/ProgressIndicator';
import QuizListItem from '../component/QuizListItem';
import { connect } from 'react-redux';
import * as aCreators from '../store/actions/actions';

const QuizScreen = (props) => {

    const {
        token,
        categoryId,
        amount,
        difficulty,
        questions } = props;

    const [isLoading, setIsLoading] = useState(false);

    const getQuestions = async () => {
        setIsLoading(true);

        let json = await requestQuestionsFromCategory(
            token,
            categoryId,
            amount,
            difficulty,
        );

        switch (json['response_code']) {
            case (0):
                props.onUpdateQuestions(json.results);
                break;
            case (1):
                alert('1: Someting went wrong!');
            case (2):
                alert('2: Someting went wrong!');
            case (3):
                alert('3: Someting went wrong!');
                break;
            case (4):
                json = await requestTokenReset(token)
                if (json['response_code'] === 0)
                    json = await requestQuestionsFromCategory(
                        token,
                        categoryId,
                        amount,
                    );
                props.onUpdateQuestions(json.results);
                break;
            default:

        }
        setIsLoading(false);
    }

    useEffect(() => {
        getQuestions()
    }, [])

    const toQuestionHandler = (currentQuestion) => {
        props.navigation.navigate('Question', {
            currentQuestion: currentQuestion
        });
    }

    const renderQuestions = () => {
        return Object.keys(questions).map(key => {
            const index = parseInt(key);
            return (<QuizListItem
                key={key}
                id={index}
                onPress={() => toQuestionHandler(index)}
                isAnswered={props.answeredQuestions[key] !== null}
                text={questions[key].question}
            />)
        })
    }

    return (
        <ScrollView
            style={_styles.container}
            contentContainerStyle={_styles.scrollContainer}>
            {isLoading
                ? <ProgressIndicator />
                : renderQuestions()}
        </ScrollView>
    );
}

const mapStateToProps = state => {
    return {
        answeredQuestions: state.quiz.answeredQuestions,
        token: state.settings.token,
        categoryId: state.quiz.categoryId,
        amount: state.settings.amount,
        difficulty: state.settings.difficulty,
        questions: state.quiz.questions,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateQuestions: (questions) => dispatch(aCreators.updateQuestions(questions)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen);

QuizScreen.propTypes = {
    route: PropTypes.any,
    navigation: PropTypes.object,
    answeredQuestions: PropTypes.array.isRequired,
    token: PropTypes.string.isRequired,
    categoryId: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    difficulty: PropTypes.oneOf(['easy', 'medium', 'hard', 'any']).isRequired,
    questions: PropTypes.array.isRequired,
};

const _styles = StyleSheet.create({
    container: {
        minHeight: 100,
    },
    scrollContainer: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
});