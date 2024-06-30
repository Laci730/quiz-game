import { useState, useEffect, useCallback } from "react";
import useFetch from "../../Hooks/useFetch";
import base64 from "base-64";
import utf8 from "utf8";
import "../../Styles/Quiz.css"
import GameOver from "../GameOver/GameOver";
import QuestionPanel from "../QuestionPanel/QuestionPanel";
import { trio } from "ldrs";

interface Props {
    url: string;
}

function Quiz({ url }: Props) {

    const { data, loading } = useFetch(url);
    const [score, setScore] = useState<number>(0);
    const [question, setQuestion] = useState<string>("");
    const [answers, setAnswers] = useState<string[]>([]);
    const [counter, setCounter] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [correctAnswer, setCorrectAnswer] = useState<string>("");
    const [results, setResults] = useState<boolean[]>([]);
    
    trio.register();

    const initAnswers = useCallback((n: number) => {
        const questionData = data.results[n]
        shuffle([
            decodeString(questionData.correct_answer),
            decodeString(questionData.incorrect_answers[0]),
            decodeString(questionData.incorrect_answers[1]),
            decodeString(questionData.incorrect_answers[2])
        ]);
    }, [data.results]);
    
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

    function nextQuestion() {
        if (counter < 9) {
            setCounter(counter + 1);
            setQuestion(decodeString(data.results[counter].question));
        }
        else {
            setGameOver(true);
        }
    }

    function onSetResults(val: boolean) {
        setResults([...results, val])
    }

    function addScore() {
        setScore(score + 1)
    }

    useEffect(() => {
        if (!loading) {
            initAnswers(counter);
            setQuestion(decodeString(data.results[counter].question));
            setCorrectAnswer(decodeString(data.results[counter].correct_answer));
        }
    }, [loading, counter, initAnswers, data.results]);

    return (
        <>
            { loading && 
                <l-trio 
                    speed="1.5"
                    size="50"
                    color="black"
                /> 
            }
            {(!loading && !gameOver) &&
                <QuestionPanel 
                    question={question}
                    answers={answers}
                    correctAnswer={correctAnswer}
                    counter={counter}
                    onNextQuestion={nextQuestion}
                    onSetResults={onSetResults}
                    addScore={addScore}
                />
            }
            {gameOver &&
                <GameOver 
                    score={score}
                    results={results}    
                />
            }
        </>
    );
}

export default Quiz;
