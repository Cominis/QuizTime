import React from 'react';
import PropTypes from 'prop-types';
import {
    Pressable,
    Text,
    StyleSheet
} from "react-native";


const Category = (props) => {

    return (
        <Pressable
            style={_styles.category}
            onPress={props.onPress}
            android_ripple={{
                borderless: false,
                radius: 30
            }}
        >
            <Text style={_styles.categoryText}>
                {props.text}
            </Text>
        </Pressable>
    );
}

export default Category;

Category.propTypes = {
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};

const _styles = StyleSheet.create({
    category: {
        margin: 12
    },
    categoryText: {
        fontSize: 20
    },
});