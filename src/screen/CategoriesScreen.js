import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ScrollView,
    ActivityIndicator,
    Pressable,
    Text,
    StyleSheet,
    Dimensions
} from "react-native";
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
        props.navigation.navigate('Quiz', { token: token, categoryId: id, answeredQuestions: new Array(10).fill(false) });
    }

    const renderCategories = () => {
        const { trivia_categories = [] } = categories;
        return trivia_categories.map(el => (
            <Pressable
                key={el["id"]}
                style={_styles.category}
                onPress={() => toQuizHandler(el["id"])}
                android_ripple={{
                    borderless: false,
                    radius: 30
                }}
            >
                <Text style={_styles.categoryText}>
                    {el["name"]}
                </Text>
            </Pressable>
        ))
    }
    return (
        <ScrollView style={_styles.container} contentContainerStyle={_styles.scrollContainer}>
            {isLoading && (<ActivityIndicator
                animating={isLoading}
                hidesWhenStopped
                size="large"
                color="#00ff00"
            />)}
            {renderCategories()}
        </ScrollView>
    );
}

export default CategoriesScreen;

CategoriesScreen.propTypes = {

};

const _styles = StyleSheet.create({
    container: {
        minHeight: 100
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: 'stretch'
    },
    category: {
        margin: 12
    },
    categoryText: {
        fontSize: 20
    }
});