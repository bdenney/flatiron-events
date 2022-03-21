import React from 'react'
import MaterialIcon from './MaterialIcon';

function CreatorDisplay({personString}) {
    return(
        personString 
        ?
            <div className="property-display">
                <img src="./images/person-icon.svg" />
                <h3>{personString}</h3>
            </div>
        : null
    );
}

export default CreatorDisplay;