import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Button,
} from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";
import Question from '../component/Question';
import Answers from '../component/Answers';

const QuestionScreen = ({ navigation, route }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: (props) => (
                <HeaderBackButton
                    {...props}
                    onPress={() => { navigation.navigate('Quiz', { answeredQuestions: answeredQuestions }) }}
                />)
        });
    }, [navigation]);

    const {
        questions,
        answeredQuestions,
        currentQuestion,
        amount } = route.params;

    const onNextHandler = () => {
        if (currentQuestion >= amount - 1) {
            navigation.navigate('Results', { amount: amount, answeredQuestions: answeredQuestions });
        } else {
            navigation.push('Question', {
                questions: questions,
                answeredQuestions: answeredQuestions,
                currentQuestion: currentQuestion + 1,
                amount: amount,
            });
        }
    }

    const onPreviousHandler = () => {
        navigation.push('Question', {
            questions: questions,
            answeredQuestions: answeredQuestions,
            currentQuestion: currentQuestion - 1,
            amount: amount,
        });
    }

    return (
        <View style={_styles.container}>
            <View style={_styles.questionContainer}>
                <View style={_styles.buttonsContainer}>
                    {
                        //todo: make swipable
                    }
                    <Button
                        title='Previous'
                        onPress={onPreviousHandler}
                        disabled={currentQuestion === 0} />
                    <Button
                        title={currentQuestion >= amount - 1 ? 'Results' : 'Next'}
                        onPress={onNextHandler} />
                </View>
                <Question text={questions[currentQuestion].question} />
            </View>
            <View style={_styles.answersContainer}>
                <Answers
                    questions={questions}
                    answeredQuestions={answeredQuestions}
                    currentQuestion={currentQuestion}
                />
            </View>

        </View>
    );
}

export default QuestionScreen;

QuestionScreen.propTypes = {
    route: PropTypes.shape({
        params: PropTypes.shape({
            questions: PropTypes.array.isRequired,
            answeredQuestions: PropTypes.array.isRequired,
            currentQuestion: PropTypes.number.isRequired,
            amount: PropTypes.number.isRequired,
        }).isRequired,
    }),
    navigation: PropTypes.object,
};

const _styles = StyleSheet.create({

    container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'stretch',
        margin: 10,
    },
    questionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    buttonsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    answersContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'stretch',
    },
});