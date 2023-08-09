import { useState, useEffect, useCallback } from "react";
import useFetch from "../../Hooks/useFetch";
import base64 from "base-64";
import utf8 from "utf8";
import "../../Styles/Quiz.css"
import Answer from "../Answer/Answer";

interface Props {
    url: string;
}

function Quiz({ url }: Props) {

    const { data, loading } = useFetch(url);
    const [score, setScore] = useState<number>(0);
    const [counter, setCounter] = useState<number>(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [correctAnswer, setCorrectAnswer] = useState<string>("");
    const [question, setQuestion] = useState<string>("");
    const [clicked, setClicked] = useState<boolean>(false);
    const [classNames, setClassNames] = useState<string[]>(["answer", "answer", "answer", "answer"]);

    const initAnswers = useCallback((n: number) => {
        const questionData = data.results[n]
        shuffle([
            decodeString(questionData.correct_answer),
            decodeString(questionData.incorrect_answers[0]),
            decodeString(questionData.incorrect_answers[1]),
            decodeString(questionData.incorrect_answers[2])
        ]);
    }, [data.results]);

    useEffect(() => {
        if (!loading) {
            initAnswers(counter);
            setQuestion(decodeString(data.results[counter].question));
            setCorrectAnswer(decodeString(data.results[counter].correct_answer));
        }
    }, [loading, counter, initAnswers, data.results]);

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

    function handleClick(answer: string) {
        setClassNames(answers.map((answer) => answer === correctAnswer ? "disabled correct" : "disabled wrong"))
        setClicked(true);
        if (answer === correctAnswer) {
            setScore(score + 1);
        }
    }

    function nextQuestion() {
        if (counter < 9) {
            setClicked(false);
            setCounter(counter + 1);
            setQuestion(decodeString(data.results[counter].question));
            setClassNames(["answer", "answer", "answer", "answer"]);
        }
        else {
            setGameOver(true);
        }
    }

    return (
        <>
            {(!loading && !gameOver) &&
                <div className="quiz">
                    <progress value={counter + 1} max={10} />
                    <h3 className="question">{counter + 1}. {question}</h3>
                    {answers.map((answer, id) =>
                        <Answer
                            classname={classNames[id]}
                            key={id}
                            answer={answer}
                            locked={clicked}
                            handleClick={handleClick}
                        />
                    )}
                    {clicked && <div className="next-button" onClick={() => nextQuestion()}>next</div>}
                </div>
            }
            {gameOver &&
                <div className="game-over">
                    <h3 className="score"> Score: {score} / 10 </h3>
                    <div className="restart-btn" onClick={() => window.location.reload()}> Play again </div>
                </div>
            }
        </>
    );
}

export default Quiz;
