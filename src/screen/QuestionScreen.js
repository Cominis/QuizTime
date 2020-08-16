import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Button } from "react-native";
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
        <View>
            <Text>{decodeURIComponent(QnA.question)}</Text>
            {answers.map(el => (
                <Button {...el} color={isAnswered ? (el.key === 3 ? 'green' : 'red') : ''}></Button>
            ))}
        </View>
    );
}

export default QuestionScreen;

QuestionScreen.propTypes = {

};

const _styles = StyleSheet.create({

});