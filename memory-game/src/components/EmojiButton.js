export default function EmojiButton({content, handleClick, selectedCardsEntry, matchedCardsEntry }) {
    {/* Destructuring - use props as parameters to extract values */}

    const btnContent = selectedCardsEntry || matchedCardsEntry ? content : "?"
    
    return (
        <button className="btn btn-emoji" onClick={ handleClick }>
            {btnContent}
        </button>
    )
}