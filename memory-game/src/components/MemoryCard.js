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

        const cardStyle =
            selectedCardsEntry ? "card-item--selected" :
            matchedCardsEntry ? "card-item--matched" :
            ""
        /* this is equivalent to if else condition,
            if (selectedCardsEntry) {
                "card-item--selected"
            }  else if (matchedCardsEntry)  {
                "card-item--matched"
            }  else {
                ""
            }
        */

        return (
            
            <li key={index} className={`card-item ${cardStyle}`}>
                {/* string interpolation, Backticks (` `) → Used for template literals, allowing us to mix fixed text with variables.
                Varying values of cardStyle may give us different styling in css code.*/}
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