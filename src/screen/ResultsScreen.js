import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
    Button,
} from "react-native";
import { connect } from 'react-redux';
import ProgressIndicator from '../component/ProgressIndicator';
import { storeData, getData } from '../helper/Storage';

const ResultsScreen = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const correctArray = props.answeredQuestions.filter((el) => el === true);
    const incorrectArray = props.answeredQuestions.filter((el) => el === false);
    const unaswered = props.amount - correctArray.length - incorrectArray.length;

    const getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const dd = String(today.getDate()).padStart(2, '0');
        const HH = String(today.getHours()).padStart(2, '0');
        const mm = String(today.getMinutes()).padStart(2, '0');
        const ss = String(today.getSeconds()).padStart(2, '0');
        return yyyy + '-' + MM + '-' + dd + ' ' + HH + ':' + mm + ':' + ss;
    }

    const saveResultHandler = async () => {
        setIsLoading(true)
        const oldHistory = await getData('history') || {};
        const date = getCurrentDate();
        const results = props.questions.map((el, index) => ({
            ...el, answered: props.answeredQuestions[index],
        }));

        const newHistory = { [date]: results, ...oldHistory };
        const isSuccess = await storeData('history', newHistory);
        setIsLoading(false);
        isSuccess ? props.navigation.navigate('Home') : alert('Something went wrong!');
    }

    const button = isLoading
        ? <ProgressIndicator />
        : (unaswered === 0 ?
            (<Button
                title='Save Result'
                onPress={saveResultHandler}
            />) : null);

    return (
        <View style={_styles.container}>
            <View style={[_styles.vertical, _styles.center, _styles.five]}>
                <Text>
                    {props.amount} Questions
                </Text>
                <Text>
                    From
                </Text>
                <Text style={_styles.bold}>
                    Category {props.categoryName}
                </Text>
            </View>
            <View style={[_styles.horizontal, _styles.three]}>
                <View style={[_styles.vertical, _styles.right]}>
                    <Text style={_styles.result}>
                        Correct:
                    </Text>
                    <Text style={_styles.result}>
                        Incorrect:
                    </Text>
                    <Text style={_styles.result}>
                        Unanswered:
                    </Text>
                </View>
                <View style={[_styles.vertical, _styles.left]}>
                    <Text style={_styles.result}>
                        {correctArray.length}
                    </Text>
                    <Text style={_styles.result}>
                        {incorrectArray.length}
                    </Text>
                    <Text style={_styles.result}>
                        {unaswered}
                    </Text>
                </View>
            </View>
            <View style={[_styles.vertical, _styles.two]}>
                {button}
            </View>
        </View>
    );
}

const mapStateToProps = state => {
    return {
        amount: state.settings.amount,
        answeredQuestions: state.quiz.answeredQuestions,
        categoryName: state.quiz.categoryName,
        questions: state.quiz.questions,
        answeredQuestions: state.quiz.answeredQuestions,
    }
};

export default connect(mapStateToProps)(ResultsScreen);

ResultsScreen.propTypes = {
    route: PropTypes.any,
    navigation: PropTypes.object,
    amount: PropTypes.number.isRequired,
    answeredQuestions: PropTypes.array.isRequired,
};

const _styles = StyleSheet.create({
    container: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    result: { fontSize: 25 },
    five: { flex: 5 },
    three: { flex: 3 },
    two: { flex: 2 },
    vertical: {
        flexDirection: 'column',
        color: 'black',
        justifyContent: 'center',
    },
    left: {
        alignItems: 'flex-end',
    },
    right: {
        marginRight: 20,
        alignItems: 'flex-start',
    },
    center: {
        alignItems: 'center',
    },
    horizontal: {
        flexDirection: 'row',
    },
});