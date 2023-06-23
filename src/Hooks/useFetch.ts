import { useEffect, useState, useRef } from "react";
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
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);

    const initialRender = useRef(true);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        axios
            .get<QuizResponse>(url)
            .then(response => {
                setData(response.data);
                setError(null);
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [url]);

    return { data, error, loading };
}

export default useFetch;