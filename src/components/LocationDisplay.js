import React from 'react'
import MaterialIcon from "./MaterialIcon"

function LocationDisplay({locationString}) {
    return(
        locationString ?
            <div className="property-display">
                <MaterialIcon name="room"/>
                <h3>{locationString}</h3>
            </div>
        : null
    )
}

export default LocationDisplay;