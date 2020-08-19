import React from 'react';
import PropTypes from 'prop-types';
import {
    Pressable,
    Text,
    StyleSheet
} from "react-native";
import trunc from '../helper/Truncate';


const QuizListItem = (props) => {

    return (
        <Pressable
            style={props.isAnswered ? _styles.viewedQuestion : _styles.normalQuestion}
            onPress={props.onPress}
        >
            <Text style={_styles.numberText}>
                {props.id + 1}
            </Text>
            <Text style={_styles.text}>
                {trunc(decodeURIComponent(props.text), 25)}
            </Text>
        </Pressable>
    );
}

export default QuizListItem;

QuizListItem.propTypes = {
    id: PropTypes.number.isRequired,
    isAnswered: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};

const _styles = StyleSheet.create({
    normalQuestion: {
        padding: 5,
        paddingEnd: 20,
        flexDirection: 'row',
    },
    viewedQuestion: {
        backgroundColor: '#ccc',
        padding: 5,
        paddingEnd: 20,
        flexDirection: 'row',
    },
    text: {
        fontSize: 20,
        textAlignVertical: 'center',
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
        borderRadius: 20,
    },
});