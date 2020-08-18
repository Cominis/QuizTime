import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from "react-native";

const ResultsScreen = ({ navigation, route }) => {
    const { amount, answeredQuestions } = route.params;
    const results = [];
    for (let i = 0; i < amount; i++) {
        results.push();
    }
    return (
        <View style={_styles.container}>
            {answeredQuestions.map((el, index) => {
                return <Text key={index}>value: {`${el}`}</Text>
            })}
        </View>
    );
}

export default ResultsScreen;

ResultsScreen.propTypes = {

};

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});