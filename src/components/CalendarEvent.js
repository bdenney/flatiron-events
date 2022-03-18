import React from 'react'
import FlatironEvent from '../classes/FlatironEvent';
import LocationDisplay from './LocationDisplay'
import CreatorDisplay from './CreatorDisplay'

function CalendarEvent({ fiEvent }) {

    return(
        <div className="event-card">
            <h1 className='event-title'>{ fiEvent.title }</h1>
            <h2>{ FlatironEvent.dateString(fiEvent) }</h2>
            <div className='card-property-bar'>
                <LocationDisplay locationString={fiEvent.location} />
                <CreatorDisplay personString={fiEvent.creator} />
            </div>
        </div>
    );
}

export default CalendarEvent;