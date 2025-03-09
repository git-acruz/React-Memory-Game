import { useRef, useEffect } from "react";
import RegularButton from "./RegularButton";

function GameOver({ handleClick }) {

    const divRef = useRef(null)

    useEffect(() => {
        divRef.current.focus() /* focus method to navigate to the focused element
                                it will only work if you used keyboard to navigate*/
    }, [])

    return (
        <div className="wrapper wrapper--accent" ref={divRef} tabIndex={-1}>
            <p className="p--large">You've matched all the memory cards!</p>
            <RegularButton handleClick={handleClick}>Reset</RegularButton>
        </div>
    )
}

export default GameOver;