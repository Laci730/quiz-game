import { useState } from "react";

interface SubmitForm {
    onSubmit: (data: Data) => void;
}

interface Data {
    category: string;
    difficulty: string;
}

function Form({ onSubmit }: SubmitForm) {

    const [category, setCategory] = useState("10");
    const [difficulty, setDifficulty] = useState("easy");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit({ category, difficulty });
    }

    return (
        <form className="choose-category" method="post" onSubmit={handleSubmit}>
            <label>
                Choose a category:
                <select name="selectedCategory" value={category} onChange={event => setCategory(event.target.value)}>
                    <option value="10">General knowledge</option>
                    <option value="22">Sports</option>
                    <option value="24">History</option>
                    <option value="26">Art</option>
                    <option value="28">Animals</option>
                </select>
            </label>
            <label>
                Choose a difficulty:
                <select name="selectedDifficulty" value={difficulty} onChange={event => setDifficulty(event.target.value)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </label>
            <button type="submit"> Submit </button>
        </form>
    )
}

export default Form;