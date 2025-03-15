import { useRef, useEffect } from "react";
import RegularButton from "./RegularButton";

function ErrorCard({ handleClick }) {
    // receive resetError and pass it further to the RegularButton to use it on the onClick event handler
    const divRef = useRef(null)

    useEffect(() => {
        divRef.current.focus() /* focus method to navigate to the focused element
                                it will only work if you used keyboard to navigate*/
    }, [])

    return (
        <div className="wrapper wrapper--accent" ref={divRef} tabIndex={-1}>
            <p className="p--large">"Sorry, there was an error."</p>
            <p className="p--regular">Please come back later or restart the game.</p>
            <RegularButton handleClick={handleClick}>Restart Game</RegularButton>
        </div>
    )
}

export default ErrorCard;