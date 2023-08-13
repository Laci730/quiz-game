import { useEffect, useState } from "react";
import axios from "axios";

interface QuizQuestion {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

interface QuizResponse {
    results: QuizQuestion[];
}


function useFetch(url: string) {
    const [data, setData] = useState<QuizResponse>({ results: [] });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios
            .get<QuizResponse>(url)
            .then(response => {
                setData(response.data);
            })
            .catch(() => console.log("Fetch error"))
            .finally(() => setLoading(false));
    }, [url]);

    return { data, loading };
}

export default useFetch;