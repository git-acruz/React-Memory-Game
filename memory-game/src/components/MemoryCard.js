import EmojiButton from "./EmojiButton";

// use DOMParser to decode htmlcodes in the API
function decodeHtmlEntities(text) {
    const doc = new DOMParser().parseFromString(text, "text/html");
    return doc.documentElement.textContent;
/* you can use new DOMParser().parseFromString(htmlcode, "text/html").documentElement.textContent
    directly like that but it looks messy */
}

function MemoryCard({ handleClick, data, selectedCards, matchedCards }) {
    
    const emojiEl = data.map((emoji, index) => {
        const selectedCardsEntry = selectedCards.find(btnClicked => btnClicked.index === index)
        const matchedCardsEntry = matchedCards.find(btnClicked => btnClicked.index === index)

        return (
            
            <li key={index} className="card-item">
                <EmojiButton
                    handleClick={() => handleClick(emoji.name, index)}
                    selectedCardsEntry = {selectedCardsEntry}
                    matchedCardsEntry = {matchedCardsEntry}
                    /* call DOMParser function to decode htmlcode */
                    content = {decodeHtmlEntities(emoji.htmlCode[0])}
                />
            </li>

        )
    })

    return (
        <ul className="card-container">{emojiEl}</ul>
    )
}

export default MemoryCard;