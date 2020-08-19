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
        settings } = props.route.params;

    const [questions, setQuestions] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const getQuestions = async () => {
        setIsLoading(true);
        let json = await requestQuestionsFromCategory(
            token,
            categoryId,
            settings.amount,
            settings.difficulty,
        );

        switch (json['response_code']) {
            case (0):
                setQuestions(json);
                break;
            case (1):
            case (2):
            case (3):
                alert('Someting went wrong!');
                break;
            case (4):
                json = await requestTokenReset(token)
                if (json['response_code'] === 0)
                    json = await requestQuestionsFromCategory(
                        token,
                        categoryId,
                        settings.amount,
                    );
                setQuestions(json);
                break;
            default:

        }
        setIsLoading(false);
    }

    useEffect(() => {
        getQuestions()
    }, [])

    //update
    const toQuestionHandler = (questions, currentQuestion) => {
        props.navigation.navigate('Question', {
            questions: questions,
            currentQuestion: currentQuestion
        });
    }

    const renderQuestions = () => {
        const { results = [] } = questions;
        return Object.keys(results).map(key => {
            const index = parseInt(key);
            return (<QuizListItem
                key={key}
                id={index}
                onPress={() => toQuestionHandler(results, index)}
                isAnswered={props.answeredQuestions[key] !== null}
                text={results[key].question}
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
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitAnswers: (amount) => dispatch(aCreators.initAnswers(amount)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen);

QuizScreen.propTypes = {
    route: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired,
            categoryId: PropTypes.number.isRequired,
            settings: PropTypes.shape({
                amount: PropTypes.number.isRequired,
                difficulty: PropTypes.oneOf(['easy', 'medium', 'hard', 'any']).isRequired,
            }).isRequired,
        }).isRequired,
    }),
    navigation: PropTypes.object,
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