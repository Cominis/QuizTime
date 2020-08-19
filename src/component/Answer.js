import React from 'react';
import PropTypes from 'prop-types';
import {
    Pressable,
    Text,
    StyleSheet
} from "react-native";


const Answer = (props) => {

    return (
        <Pressable
            onPress={props.onPress}
            disabled={props.isAnswered}
            android_ripple={{ borderless: false }}
            style={props.isAnswered ? (props.id === props.correctId ? _styles.correct : _styles.incorrect) : _styles.normal}>
            <Text style={_styles.answer}>
                {props.text}
            </Text>
        </Pressable>
    );
}

export default Answer;

Answer.propTypes = {
    isAnswered: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    correctId: PropTypes.number.isRequired
};

const _styles = StyleSheet.create({
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
    },
});