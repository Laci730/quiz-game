type Props = {
    text: string,
    click?: () => void,
    type?: "button" | "submit" | "reset" | undefined,
    className?: string
}

export default function Button({text, type, click, className}: Props) {
    return (
        <button 
            className={"min-w-24 h-12 border-2 border-black rounded-lg bg-white hover:bg-gray-200 " + className}
            type={type ? type : "button"}
            onClick={click}
        >
            {text}
        </button>
    )
}