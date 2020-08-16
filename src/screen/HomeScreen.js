import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet, Button } from "react-native";
import Logo from '../assets/images/dummy.png'
const HomeScreen = (props) => {

    const onPressHandler = () => {
        props.navigation.navigate('Categories')
    }

    return (
        <View style={_styles.Center}>
            <Image source={Logo} />
            <Button title='start' onPress={onPressHandler}></Button>
        </View>
    );
}

export default HomeScreen;

HomeScreen.propTypes = {

};

const _styles = StyleSheet.create({
    Center: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});