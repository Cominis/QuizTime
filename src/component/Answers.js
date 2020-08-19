import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Answer from '../component/Answer';
import shuffle from '../helper/Shuffle';
import { connect } from 'react-redux';
import * as aCreators from '../store/actions/actions';

const Answers = (props) => {

    const {
        questions,
        answeredQuestions,
        currentQuestion,
    } = props;

    const [isAnswered, setIsAnswered] = useState(answeredQuestions[currentQuestion]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const answers = Object.keys(questions[currentQuestion].incorrect_answers).map((key) =>
            ({
                key: key,
                text: decodeURIComponent(questions[currentQuestion].incorrect_answers[key]),
                onPress: () => { onAnsweredHandler(false) },
            })
        );
        answers.push({
            key: 3,
            text: decodeURIComponent(questions[currentQuestion].correct_answer),
            onPress: () => { onAnsweredHandler(true) },
        });
        shuffle(answers);
        setAnswers(answers);
    }, [setAnswers]);

    const onAnsweredHandler = (answer) => {
        setIsAnswered(true);
        props.onUpdateAnswer(currentQuestion, answer);
    }

    return answers.map(el =>
        (<Answer
            key={el.key}
            id={parseInt(el.key)}
            onPress={el.onPress}
            text={el.text}
            correctId={3}
            isAnswered={isAnswered != null}
        />)
    )
}

const mapStateToProps = state => {
    return {
        answeredQuestions: state.quiz.answeredQuestions,
        questions: state.quiz.questions,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateAnswer: (index, value) => dispatch(aCreators.updateAnswer(index, value)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Answers);

Answers.propTypes = {
    questions: PropTypes.array.isRequired,
    answeredQuestions: PropTypes.array.isRequired,
    currentQuestion: PropTypes.number.isRequired,
};