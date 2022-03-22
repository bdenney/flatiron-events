import React from 'react'

function LocationDisplay({locationString}) {
    return(
        locationString ?
            <div className="property-display">
                <img src='./images/location-icon.svg'/>
                <h3>{locationString}</h3>
            </div>
        : null
    )
}

export default LocationDisplay;