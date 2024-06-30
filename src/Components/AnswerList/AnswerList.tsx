import { useState } from "react";
import Button from "../Button/Button";
import Answer from "./Answer/Answer";

type Props = {
    answers: string[],
    correctAnswer: string,
    onNext: () => void,
    addScore: () => void,
    onSetResults: (val: boolean) => void
}

export default function AnswerList({answers, correctAnswer, onNext, addScore, onSetResults}: Props) {
    const answerClass = "w-2/3 h-12 my-2 p-8 flex justify-center items-center text-lg bg-white border-2 border-stone-700 rounded-lg text-stone-700 cursor-pointer hover:bg-gray-200"
    const correctClass = "w-2/3 h-12 my-2 p-8 flex justify-center items-center text-lg bg-green-500 text-white rounded-lg"
    const wrongClass = "w-2/3 h-12 my-2 p-8 flex justify-center items-center text-lg bg-red-500 text-white rounded-lg"
    
    const [clicked, setClicked] = useState<boolean>(false);
    const [classNames, setClassNames] = useState<string[]>([answerClass, answerClass, answerClass, answerClass]);

    function handleClick(answer: string) {
        setClassNames(answers.map((answer) => answer === correctAnswer ? correctClass : wrongClass))
        setClicked(true);
        if (answer === correctAnswer) {
            addScore();
            onSetResults(true);
        } else {
            onSetResults(false);
        }
    }

    return (
        <div className="w-full grid md:grid-rows-3 md:grid-cols-2 place-items-center grid-rows-5 grid-cols-1 mt-16">
        {answers.map((answer, id) => {
            return <Answer
                classname={classNames[id]}
                key={id}
                answer={answer}
                locked={clicked}
                handleClick={handleClick}
            />
            }
        )}
        { clicked && 
            <Button 
                className="col-span-full"
                text="next" 
                click={
                    () => {
                        onNext();
                        setClicked(false);
                        setClassNames([answerClass, answerClass, answerClass, answerClass]);
                }}
            /> 
        }
        </div>
    
    )
}