import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Image,
    StyleSheet,
    Button
} from "react-native";
import Logo from '../assets/images/logo.png'
const HomeScreen = (props) => {

    const onStartHandler = () => {
        props.navigation.navigate('Categories')
    }

    return (
        <View style={_styles.Center}>
            <Image source={Logo} />
            <Button title='start' onPress={onStartHandler}></Button>
        </View>
    );
}

export default HomeScreen;

HomeScreen.propTypes = {
    route: PropTypes.any,
    navigation: PropTypes.object,
};

const _styles = StyleSheet.create({
    Center: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});