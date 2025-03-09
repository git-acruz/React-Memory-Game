
function AssistiveTechInfo({emojisData, matchedCards}) {

    return (
        <section className="sr-only" aria-live="polite" aria-atomic="true">
            <h2>Game Status</h2>
            <p>Number of matched pairs: {matchedCards.length / 2}.</p>
            <p>Number of cards left to match: {emojisData.length - matchedCards.length}.</p>
        </section>
    )
}

/* How to use aria-atomic:
- is set on a live region, e.g(div, section), containing dynamically changing content.
- Takes either true or false as a value:
    - True: the entire region is treated as a single unit and all content (whether static or dynamic)
      is read aloud whenever any part of it is changing.
    - False: the region is not treated as a unit. Only changed content is read aloud */

export default AssistiveTechInfo;