import { data } from "../data/data";
import Options from "./Options";
 
export default function Select({ handleChange }) {
    // object.entries convert object of array of object to array of array of object
    // .map() iterates key = [category, number] and value = [[name: {objects}, value: {objects}], [value: string]]
    const selectEl = Object.entries(data).map(([key, value]) => (
        <div key={key} className="form--innerwrapper">
            {/* <label htmlFor={key}>{key}:</label> */}
            {/* do, key.charAt(0).toUpperCase() to make 1st letter uppercase and
            key.slice(1) to prevent 2nd letter and the rest from being uppercase */}
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <select name={key} id={key} onChange={handleChange}>
                <Options valArray={value} />
            </select>
        </div>
    ))
 
    return <>{selectEl}</>
}