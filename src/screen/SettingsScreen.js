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

const SettingsScreen = ({ navigation }) => {
    const [difficulty, setDifficulty] = useState('any')
    const [amount, setAmount] = useState(10)
    const [isChanged, setIsChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isPreloading, setIsPreloading] = useState(true);

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
    }, [setDifficulty, setAmount, setIsPreloading]);

    const readValues = async () => {
        const settings = await getData('settings') || { amount: 10, difficulty: 'any' }
        if (settings !== null) {
            setDifficulty(settings.difficulty);
            setAmount(settings.amount);
        } else {
            alert('Something went wrong!');
        }
        setIsPreloading(false);
    }

    return isPreloading
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
                    setDifficulty(prevState => {
                        if (prevState !== value)
                            setIsChanged(true);
                        return value;
                    });
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
                    setAmount(prevState => {
                        if (prevState !== value)
                            setIsChanged(true);
                        return value;
                    });
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

export default SettingsScreen;

SettingsScreen.propTypes = {
    route: PropTypes.any,
    navigation: PropTypes.object,
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