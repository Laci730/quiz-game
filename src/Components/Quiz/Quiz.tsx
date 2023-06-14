import { useState, useEffect, useCallback } from "react";
import useFetch from "../../Hooks/useFetch";
import base64 from "base-64";
import utf8 from "utf8";
import "../../Styles/Quiz.css"

interface Props {
    url: string;
}

function Quiz({ url }: Props) {

    const { data, loading } = useFetch(url);
    const [counter, setCounter] = useState(0);
    const [answerClasses, setAnswerClasses] = useState<string[]>([]);
    const [clicked, setClicked] = useState(false);
    const [answers, setAnswers] = useState<string[]>([]);
    const [correctAnswerCounter, setCorrectAnswerCounter] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    let question: string = loading ? "" : decodeString(data.results[counter].question);


    const initAnswers = useCallback((n: number) => {
        const questionData = data.results[n]
        const answers = [
            decodeString(questionData.correct_answer),
            decodeString(questionData.incorrect_answers[0]),
            decodeString(questionData.incorrect_answers[1]),
            decodeString(questionData.incorrect_answers[2])
        ];
        return shuffle(answers);
    }, [data.results]);

    useEffect(() => {
        if (!loading) {
            initAnswers(counter);
        }
    }, [loading, counter, initAnswers]);

    function shuffle(arr: string[]) {
        const shuffledArray: string[] = [];
        while (shuffledArray.length !== 4) {
            let randIndex = Math.floor(Math.random() * 4);
            if (!(shuffledArray.includes(arr[randIndex]))) {
                shuffledArray.push(arr[randIndex]);
            }
        }
        setAnswers(shuffledArray);
    }

    function decodeString(string: string) {
        return utf8.decode(base64.decode(string));
    }

    function checkAnswer(answer: string) {
        if (!clicked) {
            const correctAnswer = decodeString(data.results[counter].correct_answer);
            const newClasses = answers.map((ans) =>
                ans === answer ? (ans === correctAnswer ? "correct" : "wrong") : ""
            )
            if (answer === correctAnswer) {
                setCorrectAnswerCounter(correctAnswerCounter + 1);
            }
            setAnswerClasses(newClasses);
            setClicked(true);
        }
    }

    function nextQuestion() {
        if (counter < 9) {
            setCounter(counter + 1);
            setClicked(false);
            setAnswerClasses([]);
        }
        else {
            setGameOver(true);
        }
    }

    return (
        <div>
            {(!loading && !gameOver) &&
                <div>
                    <h3>{counter + 1}. {question}</h3>
                    <div className="answer-container">
                        {answers.map((answer, id) => <div key={id} className={answerClasses[id]} onClick={() => checkAnswer(answer)}> {answer} </div>)}
                    </div>
                    {clicked && <div className="answer" onClick={() => setTimeout(nextQuestion, 50)}>next</div>}
                </div>
            }
            {gameOver &&
                <div>
                    <h3>Score: {correctAnswerCounter} / 10</h3>
                    <div className="restart-btn" onClick={() => window.location.reload}> Play again </div>
                </div>
            }
        </div>
    );
}

export default Quiz;
