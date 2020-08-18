import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";
import shuffle from '../helper/Shuffle';

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
        currentQuestion } = route.params;

    const [isAnswered, setIsAnswered] = useState(answeredQuestions[currentQuestion])
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        const answers = Object.keys(questions[currentQuestion].incorrect_answers).map((key) =>
            ({
                key: key,
                title: decodeURIComponent(questions[currentQuestion].incorrect_answers[key]),
                onPress: onAnsweredHandler
            })
        );
        answers.push({
            key: 3,
            title: decodeURIComponent(questions[currentQuestion].correct_answer),
            onPress: onAnsweredHandler
        });
        shuffle(answers);
        setAnswers(answers);
    }, [])

    const onAnsweredHandler = () => {
        setIsAnswered(true)
        answeredQuestions.splice(currentQuestion, 0, true);
    }

    const onNextHandler = () => {
        if (currentQuestion === 9) {
            navigation.push('Results')
        } else {
            navigation.push('Question', {
                questions: questions,
                answeredQuestions: answeredQuestions,
                currentQuestion: currentQuestion + 1
            })
        }
    }

    const onPreviousHandler = () => {
        navigation.push('Question', {
            questions: questions,
            answeredQuestions: answeredQuestions,
            currentQuestion: currentQuestion - 1
        })
    }

    return (
        <View style={_styles.container}>
            <View style={_styles.questionContainer}>
                <View style={_styles.buttonsContainer}>
                    {
                        //todo: make swipable
                    }
                    <Button title='Previous' onPress={onPreviousHandler} disabled={currentQuestion === 0} />
                    <Button title={currentQuestion === 9 ? 'Results' : 'Next'} onPress={onNextHandler} />
                </View>
                <Text style={_styles.question}>
                    {decodeURIComponent(questions[currentQuestion].question)}
                </Text>
            </View>
            <View style={_styles.answersContainer}>
                {answers.map(el => (
                    <Pressable
                        key={el.key}
                        onPress={el.onPress}
                        disabled={isAnswered}
                        android_ripple={{ borderless: false }}
                        style={isAnswered ? (el.key === 3 ? _styles.correct : _styles.incorrect) : _styles.normal}>
                        <Text style={_styles.answer}>
                            {el.title}
                        </Text>
                    </Pressable>
                ))}
            </View>

        </View>
    );
}

export default QuestionScreen;

QuestionScreen.propTypes = {

};

const _styles = StyleSheet.create({

    container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'stretch',
        margin: 10
    },
    questionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    buttonsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    question: {
        margin: 12,
        fontSize: 24,
        fontWeight: 'bold'
    },
    answersContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    answer: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white'
    },
    normal: {
        backgroundColor: '#aaa',
        margin: 6,
        padding: 12,
        paddingStart: 20,
        paddingEnd: 20,
        borderRadius: 32
    },
    correct: {
        backgroundColor: 'green',
        margin: 6,
        padding: 12,
        paddingStart: 20,
        paddingEnd: 20,
        borderRadius: 32
    },
    incorrect: {
        backgroundColor: 'red',
        margin: 6,
        padding: 12,
        paddingStart: 20,
        paddingEnd: 20,
        borderRadius: 32
    }
});