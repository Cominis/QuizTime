import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, ActivityIndicator, Button, StyleSheet } from "react-native";
import { requestCategories, requestToken } from '../api/api';

const CategoriesScreen = (props) => {
    const [categories, setCategories] = useState({})
    const [token, setToken] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const getInfo = async () => {
        setIsLoading(true)
        const [result, tokenInfo] = await Promise.all([requestCategories(), requestToken()]);
        if (result) setCategories(result);
        if (tokenInfo) setToken(tokenInfo.token)
        setIsLoading(false)
    }

    useEffect(() => {
        getInfo()
    }, [])


    const toQuizHandler = (id) => {
        props.navigation.navigate('Quiz', { token: token, categoryId: id });
    }

    const renderCategories = () => {
        const { trivia_categories = [] } = categories;
        return trivia_categories.map(el => (
            <Button
                key={el["id"]}
                title={el["name"]}
                style={_styles.button}
                onPress={() => toQuizHandler(el["id"])}
            />
        ))
    }
    return (
        <View style={_styles.container}>
            <ScrollView>
                {isLoading
                    ? <ActivityIndicator size="large" color="#00ff00" />
                    : null}
                {renderCategories()}
            </ScrollView>
        </View>
    );
}

export default CategoriesScreen;

CategoriesScreen.propTypes = {

};

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        padding: '50px'
    }
});