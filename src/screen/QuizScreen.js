import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, ActivityIndicator, Button, StyleSheet } from "react-native";
import { requestQuestionsFromCategory } from '../api/api';

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
            <Button
                key={key}
                title={decodeURIComponent(results[key].question)}
                style={_styles.button}
                onPress={() => toQuestionHandler(results[key])}
            />
        ))
    }
    return (
        <View style={_styles.container}>
            <ScrollView>
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
    button: {
        padding: '50px'
    }
});