import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
    Pressable,
    ActivityIndicator
} from "react-native";
import { Picker } from '@react-native-community/picker';
import { storeData, getData } from '../helper/Storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import * as aCreators from '../store/actions/actions';

const SettingsScreen = (props) => {

    const { navigation, amount, difficulty } = props;

    const [isChanged, setIsChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: rightHeaderHandler
        });
    }, [navigation, difficulty, amount, isChanged, setIsChanged, isLoading, setIsLoading]);

    const rightHeaderHandler = () => (
        isChanged ? (
            isLoading ? (
                <ActivityIndicator
                    style={_styles.icon}
                    size="large"
                    color="#00ff00" />)
                : (
                    <Pressable
                        style={_styles.icon}
                        onPress={() => { storeValues() }}
                        android_ripple>
                        <Icon
                            name="check"
                            size={30}
                            color="#000" />
                    </Pressable>)
        ) : null
    )

    const storeValues = async () => {
        setIsLoading(true)
        const obj = {
            difficulty: difficulty,
            amount: amount
        }
        const isSuccess = await storeData('settings', obj);
        setIsChanged(!isSuccess)
        setIsLoading(false)
        isSuccess && navigation.goBack();
    }

    useLayoutEffect(() => {
        readValues()
    }, [setIsLoading]);

    const readValues = async () => {
        const settings = await getData('settings') || { amount: 10, difficulty: 'any' }
        if (settings !== null) {
            props.onSetDifficulty(settings.difficulty);
            props.onSetAmount(settings.amount);
        } else {
            alert('Something went wrong!');
        }
        setIsLoading(false);
    }

    return isLoading
        ? (<ActivityIndicator
            style={_styles.preloading}
            size="large"
            color="#00ff00" />)
        : (<View style={_styles.container}>
            <Text>Quiz Difficulty:</Text>
            <Picker
                selectedValue={difficulty}
                style={_styles.picker}
                onValueChange={(value, itemIndex) => {
                    setIsChanged(true);
                    props.onSetDifficulty(value);
                }}
                mode='dropdown'
            >
                <Picker.Item label="Any" value="any" />
                <Picker.Item label="Easy" value="easy" />
                <Picker.Item label="Medium" value="medium" />
                <Picker.Item label="Hard" value="hard" />
            </Picker>
            <Text>Number of questions:</Text>
            <Picker
                selectedValue={amount}
                style={_styles.picker}
                onValueChange={(value, itemIndex) => {
                    setIsChanged(true);
                    props.onSetAmount(value);
                }}
                mode='dropdown'
            >
                <Picker.Item label="3" value={3} />
                <Picker.Item label="5" value={5} />
                <Picker.Item label="10" value={10} />
                <Picker.Item label="15" value={15} />
            </Picker>
        </View>);
}

const mapStateToProps = state => {
    return {
        amount: state.settings.amount,
        difficulty: state.settings.difficulty,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSetAmount: (amount) => dispatch(aCreators.setAmount(amount)),
        onSetDifficulty: (difficulty) => dispatch(aCreators.setDifficulty(difficulty)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

SettingsScreen.propTypes = {
    route: PropTypes.any,
    navigation: PropTypes.object,
    amount: PropTypes.number.isRequired,
    difficulty: PropTypes.oneOf(['easy', 'medium', 'hard', 'any']).isRequired,
};

const _styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    preloading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
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