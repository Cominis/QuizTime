import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView,
    StyleSheet,
} from "react-native";
import { requestCategories, requestToken } from '../api/api';
import { getData } from '../helper/Storage';
import Category from '../component/Category';
import ProgressIndicator from '../component/ProgressIndicator';

const CategoriesScreen = (props) => {

    const [categories, setCategories] = useState({});
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [settings, setSettings] = useState({});

    useEffect(() => {
        getInfo();
    }, [])

    const getInfo = async () => {
        setIsLoading(true);
        const [categoriesJson, tokenJson] = await Promise.all([requestCategories(), requestToken()]);
        const settingsJson = (await getData('settings')) || { amount: 10, difficulty: 'any' }
        if (categoriesJson && tokenJson['response_code'] === 0) {
            setCategories(categoriesJson);
            setToken(tokenJson.token);
        } else {
            alert('Someting went wrong!');
        }
        setSettings(settingsJson);
        setIsLoading(false);
    }

    const toQuizHandler = (id) => {
        props.navigation.navigate('QuizNavigator', {
            screen: 'Quiz',
            params: {
                token: token,
                categoryId: id,
                settings: settings,
                answeredQuestions: new Array(settings.amount).fill(null),
            },
        });
    }

    const renderCategories = () => {
        const { trivia_categories = [] } = categories;
        return trivia_categories.map(el =>
            (<Category
                key={el['id']}
                onPress={() => toQuizHandler(el['id'])}
                text={el['name']}
            />)
        )
    }

    return (
        <ScrollView style={_styles.container} contentContainerStyle={_styles.scrollContainer}>
            {isLoading
                ? <ProgressIndicator />
                : renderCategories()}
        </ScrollView>
    );
}

export default CategoriesScreen;

CategoriesScreen.propTypes = {
    route: PropTypes.any,
    navigation: PropTypes.object,
};

const _styles = StyleSheet.create({
    container: {
        minHeight: 100,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
});