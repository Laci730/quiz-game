import { useState } from "react";
import { SubmitForm } from "../../model/types";
import Button from "../Button/Button";

function Form({ onSubmit }: SubmitForm) {

    const [category, setCategory] = useState("9");
    const [difficulty, setDifficulty] = useState("easy");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit(category, difficulty);
    }

    return (
        <div className="w-full flex flex-col items-center justify-center max-w-4xl min-h-xl bg-stone-200 p-12 rounded-lg">
            <section className="">
                <div className="text-center font-bold text-2xl my-4">Quiz game</div>
                <h4 className="text-center text-lg my-4">Test your knowledge with a short quiz. <br />
                    Choose your favorite topic and have fun!</h4>
            </section>
            <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                <div className="flex flex-col my-4 w-full">
                    <label className="text-center mb-2">
                        Category
                    </label>
                    <select className="border-2 border-gray-300 rounded-md cursor-pointer" 
                        value={category} onChange={event => setCategory(event.target.value)}>
                        <option value="9">General knowledge</option>
                        <option value="15">Video games</option>
                        <option value="21">Sports</option>
                        <option value="23">History</option>
                        <option value="27">Animals</option>
                    </select>
                </div>
                <div className="flex flex-col my-4 w-full">
                    <label className="text-center mb-2">
                        Difficulty
                    </label>
                    <select className="border-2 border-gray-300 rounded-md cursor-pointer"
                        value={difficulty} onChange={event => setDifficulty(event.target.value)}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <Button type="submit" text="Start" className="my-4"/>
            </form>
        </div>
    )
}

export default Form;