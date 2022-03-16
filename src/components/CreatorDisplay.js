import React from 'react'
import MaterialIcon from './MaterialIcon';

function CreatorDisplay({personString}) {
    return(
        personString 
        ?
            <div className="property-display">
                <MaterialIcon name={"person_outline"} />
                <h3>{personString}</h3>
            </div>
        : null
    );
}

export default CreatorDisplay;