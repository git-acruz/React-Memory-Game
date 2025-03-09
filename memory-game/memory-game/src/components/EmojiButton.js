export default function EmojiButton({content, handleClick, selectedCardsEntry, matchedCardsEntry }) {
    {/* Destructuring - use props as parameters to extract values */}

    const btnContent = selectedCardsEntry || matchedCardsEntry ? content : "?"
    
    const btnStyle =
        selectedCardsEntry ? "btn--emoji__back--selected" :
        matchedCardsEntry ? "btn--emoji__back--matched" :
        "btn--emoji__front"

    return (
        <button className={`btn btn-emoji ${btnStyle}`} onClick={ handleClick }>
            {btnContent}
        </button>
    )
}