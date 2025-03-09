import { useState } from "react"

export default function EmojiButton({content, handleClick, selectedCardsEntry, matchedCardsEntry, index, emoji }) {
    /* Destructuring - use props as parameters to extract values */

    const btnContent = matchedCardsEntry || selectedCardsEntry ? content : "?"
    
    const btnStyle =
        matchedCardsEntry ? "btn--emoji__back--matched" :
        selectedCardsEntry ? "btn--emoji__back--selected" :
        "btn--emoji__front"

    const btnAria =
        matchedCardsEntry ? `${emoji.name}. Matched.` :
        selectedCardsEntry ? `${emoji.name}. Not Matched yet.` :
        "Card Upside Down"

    return (
        <button
            className={`btn btn-emoji ${btnStyle}`}
            onClick={ selectedCardsEntry ? null : handleClick }
            disabled = { matchedCardsEntry }
            aria-label={ `Position ${index}. ${btnAria}` }
            aria-live="polite">
                {btnContent}
        </button>
    )
}