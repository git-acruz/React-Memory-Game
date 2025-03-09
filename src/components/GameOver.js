import RegularButton from "./RegularButton";

function GameOver({ handleClick }) {

    return (
        <div className="wrapper wrapper--accent">
            <p className="p--large">You've matched all the memory cards!</p>
            <RegularButton handleClick={handleClick}>Reset</RegularButton>
        </div>
    )
}

export default GameOver;