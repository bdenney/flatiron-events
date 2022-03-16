import React from 'react'
import MaterialIcon from "./MaterialIcon"

function LocationDisplay({locationString}) {
    return(
        <div className="location-display">
            <MaterialIcon name="room"/>
            <h3>{locationString}</h3>
        </div>
    )
}

export default LocationDisplay;