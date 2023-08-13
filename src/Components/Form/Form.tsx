import { useState } from "react";
import "../../Styles/Form.css"

interface SubmitForm {
    onSubmit: (category: string, difficulty: string) => void;
}

function Form({ onSubmit }: SubmitForm) {

    const [category, setCategory] = useState("9");
    const [difficulty, setDifficulty] = useState("easy");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit(category, difficulty);
    }

    return (
        <>
            <section className="text">
                <div className="title">Quiz game</div>
                <h4 className="sub">Test your knowledge with a short quiz. <br />
                    Choose your favorite topic and have fun!</h4>
            </section>
            <form className="choose-category" method="post" onSubmit={handleSubmit}>
                <label className="category-form">
                    Category
                    <select name="selectedCategory" value={category} onChange={event => setCategory(event.target.value)}>
                        <option value="9">General knowledge</option>
                        <option value="15">Video games</option>
                        <option value="21">Sports</option>
                        <option value="23">History</option>
                        <option value="27">Animals</option>
                    </select>
                </label>
                <label className="difficulty-form">
                    Difficulty
                    <select name="selectedDifficulty" value={difficulty} onChange={event => setDifficulty(event.target.value)}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </label>
                <button type="submit" className="start-btn"> Start </button>
            </form>
        </>
    )
}

export default Form;