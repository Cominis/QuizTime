import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from "react-native";
import QuizContext from '../component/QuizContext';


const ResultsScreen = () => {

    const context = useContext(QuizContext);
    const { settings, answeredQuestions } = context.params;
    const { amount } = settings;
    const correctArray = answeredQuestions.filter((el) => el === true);
    const incorrectArray = answeredQuestions.filter((el) => el === false);
    const unaswered = amount - correctArray.length - incorrectArray.length;

    console.log(JSON.stringify(context));

    return (
        <View style={_styles.container}>
            <Text>Correct: {correctArray.length}</Text>
            <Text>Incorrect: {incorrectArray.length}</Text>
            <Text>Unanswered: {unaswered}</Text>
        </View>
    );
}

export default ResultsScreen;

ResultsScreen.propTypes = {
    route: PropTypes.any,
    navigation: PropTypes.object,
};

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});