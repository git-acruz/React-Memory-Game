import RegularButton from "./RegularButton";

function ErrorCard({ handleClick }) {
    // receive resetError and pass it further to the RegularButton to use it on the onClick event handler

    return (
        <div className="wrapper wrapper--accent">
            <p className="p--large">"Sorry, there was an error."</p>
            <p className="p--regular">Please come back later or restart the game.</p>
            <RegularButton handleClick={handleClick}>Restart Game</RegularButton>
        </div>
    )
}

export default ErrorCard;