import { useState, useEffect } from 'react';
import { ImCheckmark, ImCross } from "react-icons/im";

interface Props {
    results: boolean[];
}

export default function Results({ results }: Props) {
    const [visibleDivs, setVisibleDivs] = useState<boolean[]>([]);

    useEffect(() => {
        const timeouts = results.map((result, index) => {
            return setTimeout(() => {
                setVisibleDivs(prev => [...prev, result]);
            }, index * 200);
        });

        return () => {
            timeouts.forEach(timeout => clearTimeout(timeout));
        };
    }, [results]);

    return (
        <div className="w-1/2 md:row-span-2">
            <p className="mb-8 text-center text-lg">Your answers</p>
            <div className="grid grid-rows-2 grid-cols-5 gap-2">
                {visibleDivs.map((item, id) => {
                    return (
                        <div className="flex justify-center items-center" key={id}>
                            <div className={item ? "my-icon my-correct" : "my-icon my-wrong"}>
                                {item && <ImCheckmark />}
                                {!item && <ImCross />}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
