import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Answer from '../component/Answer';
import shuffle from '../helper/Shuffle';

const Answers = ({
    questions,
    answeredQuestions,
    currentQuestion,
}) => {

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
        answeredQuestions[currentQuestion] = answer;
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

export default Answers;

Answers.propTypes = {
    questions: PropTypes.array.isRequired,
    answeredQuestions: PropTypes.array.isRequired,
    currentQuestion: PropTypes.number.isRequired,
};