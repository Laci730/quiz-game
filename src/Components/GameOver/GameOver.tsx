import { useState, useEffect } from "react";
import Button from "../Button/Button"
import Results from "./Results"

type Props = {
    score: number,
    results: boolean[]
}

export default function GameOver({score, results}: Props) {

    const [count, setCount] = useState(0);
    const duration = 1000;
 
    useEffect(() => {
        let startValue = -1;
        const interval = Math.floor(
            duration / score);
 
        const counter = setInterval(() => {
            startValue += 1;
            setCount(startValue);
            if (startValue >= score) {
                clearInterval(counter);
            }
        }, interval);
 
        return () => {
            clearInterval(counter);
        };
    }, [score]);

    return(
        <div className="w-full md:p-0 h-1/2 md:min-h-96 max-w-3xl grid md:grid-rows-2 md:grid-cols-2 grid-rows-3 place-items-center bg-stone-200 rounded-xl">
            <Results results={results}/>
            <h3 className="text-xl font-bold md:self-end md:mb-4"> Score: {count} / 10 </h3>
            <Button className="md:col-start-2 md:self-start md:mt-4" text={"Play again"} click={() => window.location.reload()} />
        </div>
    )
}
