import React, { useState } from 'react';
import { Board } from './board';
import { buildData } from './utils';



const Stage = ({
    initialValue,
    maxValue,
    minValue,
})=>{

    const [currentValue, setCurrentValue] = useState(initialValue);
    const handleChange = event => {
        const value = event.target.value;
        setCurrentValue(value);
    }

    const data = buildData(currentValue);


    return (
    <>
        <div className="stage">
            <div className="control">
                <p>{currentValue}</p>
                <input
                    type="range" 
                    min={minValue}
                    max={maxValue}
                    value={currentValue}
                    onChange={handleChange}
                />
            </div>
            <div className="board">
                <Board data={[...data]} radius={50}/>
            </div>
        </div>    
    </>
    );
}

Stage.defaultProps = {
    initialValue: 100,
    maxValue: 1000,
    minValue: 0,
}

export { Stage }