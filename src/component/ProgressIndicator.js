import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet } from "react-native";

const ProgressIndicator = (props) => {

    return (
        <ActivityIndicator
            animating={props.isLoading}
            hidesWhenStopped
            size="large"
            color="#00ff00"
        />
    );
}

export default ProgressIndicator;

ProgressIndicator.propTypes = {
    isLoading: PropTypes.bool,
};