import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, ActivityIndicator, Pressable, Text, StyleSheet } from "react-native";
import { requestQuestionsFromCategory, requestTokenReset } from '../api/api';
import trunc from '../helper/Truncate';

const QuizScreen = (props) => {
    const { token, categoryId, answeredQuestions, settings } = props.route.params;

    const [questions, setQuestions] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const getQuestions = async () => {
        setIsLoading(true);
        let json = await requestQuestionsFromCategory(
            token,
            categoryId,
            settings.amount,
            settings.difficulty
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
                        settings.amount
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

    const toQuestionHandler = (questions, answeredQuestions, currentQuestion, amount) => {
        console.log(`in quiz: ${amount}`);
        props.navigation.navigate('Question', {
            questions: questions,
            answeredQuestions: answeredQuestions,
            currentQuestion: currentQuestion,
            amount: amount
        });
    }

    const renderQuestions = () => {
        const { results = [] } = questions;
        return Object.keys(results).map(key => (
            <Pressable
                key={key}
                style={answeredQuestions[key] !== null ? _styles.viewedQuestion : _styles.normalQuestion}
                onPress={() => toQuestionHandler(results, answeredQuestions, parseInt(key), settings.amount)}
            >
                <Text style={_styles.numberText}>
                    {parseInt(key) + 1}
                </Text>
                <Text style={_styles.text}>
                    {trunc(decodeURIComponent(results[key].question), 25)}
                </Text>
            </Pressable>
        ))
    }
    return (
        <ScrollView
            style={_styles.container}
            contentContainerStyle={_styles.scrollContainer}>
            {isLoading ?
                (<ActivityIndicator
                    size="large"
                    color="#00ff00"
                />)
                : renderQuestions()}
        </ScrollView>
    );
}

export default QuizScreen;

QuizScreen.propTypes = {

};

const _styles = StyleSheet.create({
    container: {
        minHeight: 100
    },
    scrollContainer: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    normalQuestion: {
        padding: 5,
        paddingEnd: 20,
        flexDirection: 'row'
    },
    viewedQuestion: {
        backgroundColor: '#ccc',
        padding: 5,
        paddingEnd: 20,
        flexDirection: 'row'
    },
    text: {
        fontSize: 20,
        textAlignVertical: 'center'
    },
    numberText: {
        minWidth: 40,
        color: 'black',
        backgroundColor: '#ccc',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 5,
        marginEnd: 5,
        borderRadius: 20
    }
});