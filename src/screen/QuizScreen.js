import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, ActivityIndicator, Pressable, Text, StyleSheet } from "react-native";
import { requestQuestionsFromCategory } from '../api/api';
import trunc from '../helper/Truncate';

const QuizScreen = (props) => {
    const [questions, setQuestions] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { token, categoryId } = props.route.params;
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


    const toQuestionHandler = (qna) => {
        props.navigation.navigate('Question', { QnA: qna });
    }

    const renderQuestions = () => {
        const { results = [] } = questions;
        return Object.keys(results).map(key => (
            <Pressable
                key={key}
                style={_styles.button}
                onPress={() => toQuestionHandler(results[key])}
            >
                <Text>
                    {parseInt(key) + 1}{') '}
                    {trunc(decodeURIComponent(results[key].question), 30)}
                </Text>
            </Pressable>
        ))
    }
    return (
        <View style={_styles.container}>
            <ScrollView contentContainerStyle={_styles.scrollContainer}>
                {isLoading
                    ? <ActivityIndicator size="large" color="#00ff00" />
                    : null}
                {renderQuestions()}
            </ScrollView>
        </View>
    );
}

export default QuizScreen;

QuizScreen.propTypes = {

};

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    scrollContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    button: {
        backgroundColor: '#aaa',
        margin: 6,
        padding: 12,
        paddingStart: 20,
        paddingEnd: 20
    }
});