import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    StyleSheet
} from "react-native";


const Question = (props) => {

    return (
        <Text style={_styles.question}>
            {decodeURIComponent(props.text)}
        </Text>
    );
}

export default Question;

Question.propTypes = {
    text: PropTypes.string.isRequired,
};

const _styles = StyleSheet.create({
    question: {
        margin: 12,
        fontSize: 24,
        fontWeight: 'bold',
    },
});