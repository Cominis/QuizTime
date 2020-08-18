import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from "react-native";
import { Picker } from '@react-native-community/picker';

const SettingsScreen = (props) => {
    const [difficulty, setDifficulty] = useState('any')
    const [questionsNumber, setQuestionsNumber] = useState(10)

    return (
        <View style={_styles.container}>
            <Text>Quiz Difficulty:</Text>
            <Picker
                selectedValue={difficulty}
                style={_styles.picker}
                onValueChange={(itemValue, itemIndex) => setDifficulty(itemValue)}
                mode='dropdown'
            >
                <Picker.Item label="Any" value="any" />
                <Picker.Item label="Easy" value="easy" />
                <Picker.Item label="Medium" value="medium" />
                <Picker.Item label="Hard" value="hard" />
            </Picker>
            <Text>Number of questions:</Text>
            <Picker
                selectedValue={questionsNumber}
                style={_styles.picker}
                onValueChange={(itemValue, itemIndex) => setQuestionsNumber(itemValue)}
                mode='dropdown'
            >
                <Picker.Item label="3" value={3} />
                <Picker.Item label="5" value={5} />
                <Picker.Item label="10" value={10} />
                <Picker.Item label="15" value={15} />
            </Picker>
        </View>
    );
}

export default SettingsScreen;

SettingsScreen.propTypes = {

};

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        margin: 20
    },
    picker: {
        borderWidth: 4,
        borderColor: "black"
    }
});