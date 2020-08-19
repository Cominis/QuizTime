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
import { connect } from 'react-redux';

const QuestionScreen = (props) => {

    const { navigation, route, questions, amount } = props;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: (props) => (
                <HeaderBackButton
                    {...props}
                    onPress={() => { navigation.navigate('Quiz') }}
                />)
        });
    }, [navigation]);

    const {
        currentQuestion
    } = route.params;

    const onNextHandler = () => {
        if (currentQuestion >= amount - 1) {
            navigation.navigate('Results');
        } else {
            navigation.push('Question', {
                currentQuestion: currentQuestion + 1,
            });
        }
    }

    const onPreviousHandler = () => {
        navigation.push('Question', {
            currentQuestion: currentQuestion - 1,
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
                    currentQuestion={currentQuestion}
                />
            </View>

        </View>
    );
}

const mapStateToProps = state => {
    return {
        questions: state.quiz.questions,
        amount: state.settings.amount,
    }
};

export default connect(mapStateToProps)(QuestionScreen);

QuestionScreen.propTypes = {
    route: PropTypes.shape({
        params: PropTypes.shape({
            currentQuestion: PropTypes.number.isRequired,
        }).isRequired,
    }),
    navigation: PropTypes.object,
    amount: PropTypes.number.isRequired,
    questions: PropTypes.array.isRequired,
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