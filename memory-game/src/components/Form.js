import { useRef, useEffect } from 'react';
import RegularButton from './RegularButton';
import Select from './Select';

function Form({ handleSubmit, handleChange, isFirstRender }) {
    const divRef = useRef(null)
    
        useEffect(() => {
            if (!isFirstRender) {
                divRef.current.focus() /* focus method to navigate to the focused element
                                        it will only work if you used keyboard to navigate*/
            }
        }, [])
        
    return (
        <div className='form-container' ref={divRef} tabIndex={-1}>
            <form className="wrapper">
                <div>
                    <Select handleChange={handleChange} />
                    {/* <div>
                        <label htmlFor='category'>Category</label>
                        <select name='category' id='category' onChange={handleChange}>
                            <option value="smileys and people">Smileys and People</option>
                            <option value="animals and nature">Animals and Nature</option>
                            <option value="travel and places">Travel and Places</option>
                            <option value="activities">Activities</option>
                            <option value="flags">Flags</option>
                        </select>
                        <label htmlFor='number'>Number of Cards</label>
                        <select name='number' id='number' onChange={handleChange}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                commenting these due to refactoring creating option and select commponents */}
                </div> 
                <div>
                    <RegularButton handleClick={handleSubmit}>Start Game</RegularButton>
                </div>
            </form>
        </div>
    )       
        
}

export default Form;