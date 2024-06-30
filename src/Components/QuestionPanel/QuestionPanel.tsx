import AnswerList from "../AnswerList/AnswerList";

type Props = {
    question: string,
    answers: string[],
    correctAnswer: string,
    counter: number,
    onNextQuestion: () => void,
    addScore: () => void,
    onSetResults: (val: boolean) => void
}

export default function QuestionPanel ({question, answers, correctAnswer, counter, onNextQuestion, addScore, onSetResults}: Props) {
    
    return (
        <div className="w-full max-w-4xl h-dvh sm:h-2/3 rounded-md bg-stone-200 flex flex-col justify-center items-center py-8">
            <div className="text-lg mb-4">
                Question {counter + 1} of 10
            </div>
            <h3 className="px-8 flex justify-center items-center font-bold text-2xl">
                {question}
            </h3>
            <AnswerList
                answers={answers}
                correctAnswer={correctAnswer}
                onNext={onNextQuestion}
                addScore={addScore}
                onSetResults={onSetResults}
            />
        </div>
    )
}