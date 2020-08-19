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
import { connect } from 'react-redux';
import * as aCreators from '../store/actions/actions';

const CategoriesScreen = (props) => {

    const [categories, setCategories] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { token, amount, difficulty } = props;

    useEffect(() => {
        getInfo();
    }, [])

    const getInfo = async () => {
        setIsLoading(true);
        const [categoriesJson, tokenJson] = await Promise.all([requestCategories(), requestToken()]);
        const settingsJson = (await getData('settings')) || { amount: 10, difficulty: 'any' }
        if (categoriesJson && tokenJson['response_code'] === 0) {
            setCategories(categoriesJson);
            props.onSetToken(tokenJson.token);
        } else {
            alert('Someting went wrong!');
        }
        props.onSetSettings(settingsJson.amount, settingsJson.difficulty)
        setIsLoading(false);
    }

    const toQuizHandler = (id, name) => {

        props.onInitAnswers(amount);
        props.onUpdateCategoryId(id, name);

        props.navigation.navigate('QuizNavigator', { screen: 'Quiz' });
    }

    const renderCategories = () => {
        const { trivia_categories = [] } = categories;
        return trivia_categories.map(el =>
            (<Category
                key={el['id']}
                onPress={() => toQuizHandler(el['id'], el['name'])}
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

const mapStateToProps = state => {
    return {
        token: state.settings.token,
        amount: state.settings.amount,
        difficulty: state.settings.difficulty,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitAnswers: (amount) => dispatch(aCreators.initAnswers(amount)),
        onSetToken: (token) => dispatch(aCreators.setToken(token)),
        onSetSettings: (amount, difficulty) => dispatch(aCreators.setSettings(amount, difficulty)),
        onUpdateCategoryId: (categoryId, categoryName) => dispatch(aCreators.updateCategoryId(categoryId, categoryName)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen);

CategoriesScreen.propTypes = {
    route: PropTypes.any,
    navigation: PropTypes.object,
    token: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    difficulty: PropTypes.oneOf(['easy', 'medium', 'hard', 'any']).isRequired,
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