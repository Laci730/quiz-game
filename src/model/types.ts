export type Answer = {
    id: number,
    text: string,
}

export type QuizQuestion = {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export type QuizResponse = {
    results: QuizQuestion[];
}

export type SubmitForm = {
    onSubmit: (category: string, difficulty: string) => void;
}
