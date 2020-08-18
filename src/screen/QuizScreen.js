import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, ActivityIndicator, Pressable, Text, StyleSheet } from "react-native";
import { requestQuestionsFromCategory } from '../api/api';
import trunc from '../helper/Truncate';

const QuizScreen = (props) => {
    const { token, categoryId, answeredQuestions } = props.route.params;
    const [questions, setQuestions] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const getQuestions = async () => {
        setIsLoading(true);
        const result = await requestQuestionsFromCategory(
            token,
            categoryId
        );
        if (result) setQuestions(result);
        setIsLoading(false);
    }

    useEffect(() => {
        getQuestions()
    }, [])


    const toQuestionHandler = (questions, answeredQuestions, currentQuestion) => {
        props.navigation.navigate('Question', {
            questions: questions,
            answeredQuestions: answeredQuestions,
            currentQuestion: currentQuestion
        });
    }

    const renderQuestions = () => {
        const { results = [] } = questions;
        return Object.keys(results).map(key => (
            <Pressable
                key={key}
                style={answeredQuestions[key] ? _styles.viewedQuestion : _styles.normalQuestion}
                onPress={() => toQuestionHandler(results, answeredQuestions, parseInt(key))}
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
            {isLoading &&
                (<ActivityIndicator
                    size="large"
                    color="#00ff00"
                />)}
            {renderQuestions()}
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