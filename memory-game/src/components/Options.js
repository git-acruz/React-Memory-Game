
export default function Options({ valArray }) {
    const optionsEl = valArray.map(({ name, value }) => (
        <option key={value} value={value}>
            {name ? name : value}
        </option>
    ))
    return <>{optionsEl}</>
}