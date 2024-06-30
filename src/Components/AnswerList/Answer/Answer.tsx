interface Props {
    classname: string;
    answer: string;
    locked: boolean;
    handleClick: (answer: string) => void;
}

function Answer({ classname, answer, locked, handleClick }: Props) {

    function selectAnswer() {
        if (!locked) {
            handleClick(answer);
        }
    }

    return (
        <div className={classname} onClick={selectAnswer}> {answer} </div>
    )
}

export default Answer;