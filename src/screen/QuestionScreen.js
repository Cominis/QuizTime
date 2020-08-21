import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Button,
    Pressable,
} from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";
import Question from '../component/Question';
import Answers from '../component/Answers';
import { connect } from 'react-redux';
import
GestureRecognizer,
{ swipeDirections, }
    from 'react-native-swipe-gestures'; //uninstall
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

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
        }
    }

    const onPreviousHandler = () => {
        if (currentIndex <= 0) {
            navigation.navigate('Quiz');
        } else {
            setCurrentIndex(currentIndex - 1);
        }

    }

    return (
        <View style={_styles.container}>
            <View style={_styles.questionContainer}>
                <Question text={questions[currentIndex].question} />
            </View>
            <View style={_styles.buttonsContainer}>
                <Pressable
                    onPress={onPreviousHandler}
                    android_ripple={{
                        borderless: true,
                    }}
                    style={_styles.button}
                >
                    {({ pressed }) => (
                        <AwesomeIcon
                            name='chevron-left'
                            size={pressed ? 55 : 50}
                            color={pressed ? 'blue' : 'black'}
                        />
                    )}

                </Pressable>
                <Pressable
                    onPress={onNextHandler}
                    android_ripple={{
                        borderless: true,
                    }}
                    style={_styles.button}
                >
                    {({ pressed }) => (
                        <AwesomeIcon
                            name='chevron-right'
                            size={pressed ? 55 : 50}
                            color={pressed ? 'blue' : 'black'}
                        />
                    )}
                </Pressable>

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
        paddingLeft: 15,
        paddingRight: 15,
    },
    button: {
        minWidth: 50,
        minHeight: 50,
    },
    answersContainer: {
        flex: 4,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'stretch',
    },
});