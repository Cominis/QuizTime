import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';

const ResultsScreen = (props) => {

    const correctArray = props.answeredQuestions.filter((el) => el === true);
    const incorrectArray = props.answeredQuestions.filter((el) => el === false);
    const unaswered = props.amount - correctArray.length - incorrectArray.length;

    return (
        <View style={_styles.container}>
            <Text>Correct: {correctArray.length}</Text>
            <Text>Incorrect: {incorrectArray.length}</Text>
            <Text>Unanswered: {unaswered}</Text>
        </View>
    );
}

const mapStateToProps = state => {
    return {
        amount: state.settings.amount,
        answeredQuestions: state.quiz.answeredQuestions,
    }
};

export default connect(mapStateToProps)(ResultsScreen);

ResultsScreen.propTypes = {
    route: PropTypes.any,
    navigation: PropTypes.object,
    amount: PropTypes.number.isRequired,
    answeredQuestions: PropTypes.array.isRequired,
};

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});