import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import shuffle from '../helper/Shuffle';

const QuestionScreen = (props) => {
    const [isAnswered, setIsAnswered] = useState(false)
    const [answers, setAnswers] = useState([])

    const { QnA } = props.route.params;

    useEffect(() => {
        const answers = Object.keys(QnA.incorrect_answers).map((key) =>
            ({ key: key, title: decodeURIComponent(QnA.incorrect_answers[key]), onPress: () => setIsAnswered(true) })
        );
        answers.push({ key: 3, title: decodeURIComponent(QnA.correct_answer), onPress: () => setIsAnswered(true) });
        shuffle(answers);
        setAnswers(answers);
    }, [])

    return (
        <View style={_styles.container}>
            <View style={_styles.questionContainer}>
                <Text style={_styles.question}>
                    {decodeURIComponent(QnA.question)}
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
        justifyContent: 'center'
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