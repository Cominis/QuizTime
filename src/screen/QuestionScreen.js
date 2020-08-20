import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Button,
} from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";
import Question from '../component/Question';
import Answers from '../component/Answers';
import { connect } from 'react-redux';
import
GestureRecognizer,
{ swipeDirections, }
    from 'react-native-swipe-gestures';

const QuestionScreen = (props) => {

    const { navigation, route, questions, amount } = props;

    const {
        currentQuestion
    } = route.params;

    const [currentIndex, setCurrentIndex] = useState(currentQuestion);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: (props) => (
                <HeaderBackButton
                    {...props}
                    onPress={() => { navigation.navigate('Quiz') }}
                />)
        });
    }, [navigation]);

    const onNextHandler = () => {
        if (currentIndex >= amount - 1) {
            navigation.navigate('Results');
        } else {
            setCurrentIndex(currentIndex + 1);
            // navigation.push('Question', {
            //     currentQuestion: currentQuestion + 1,
            // });
        }
    }

    const onPreviousHandler = () => {
        setCurrentIndex(currentIndex - 1);
        // navigation.push('Question', {
        //     currentQuestion: currentQuestion - 1,
        // });
    }

    return (
        <View style={_styles.container}>
            <View style={_styles.questionContainer}>
                <Question text={questions[currentIndex].question} />
            </View>
            <View style={_styles.buttonsContainer}>
                {
                    //todo: make swipable
                }
                <Button
                    title='Previous'
                    onPress={onPreviousHandler}
                    disabled={currentIndex === 0} />
                <Button
                    title={currentIndex >= amount - 1 ? 'Results' : 'Next'}
                    onPress={onNextHandler} />
            </View>
            <View style={_styles.answersContainer}>
                <Answers currentQuestion={currentIndex} />
            </View>
        </View>
    );
}

const mapStateToProps = state => {
    return {
        questions: state.quiz.questions,
        amount: state.settings.amount,
    }
};

export default connect(mapStateToProps)(QuestionScreen);

QuestionScreen.propTypes = {
    route: PropTypes.shape({
        params: PropTypes.shape({
            currentQuestion: PropTypes.number.isRequired,
        }).isRequired,
    }),
    navigation: PropTypes.object,
    amount: PropTypes.number.isRequired,
    questions: PropTypes.array.isRequired,
};

const _styles = StyleSheet.create({

    container: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'stretch',
        margin: 10,
    },
    questionContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    buttonsContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    answersContainer: {
        flex: 4,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'stretch',
    },
});