import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
        return true;
    } catch (e) {
        return false;
    }
}

export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        return null;
    }
}

export const storeString = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
        return true;
    } catch (e) {
        return false;
    }
}

export const getString = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        return value !== null ? value : null;
    } catch (e) {
        return null;
    }
}