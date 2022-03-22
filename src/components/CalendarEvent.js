import React from 'react'
import FlatironEvent from '../classes/FlatironEvent';
import LocationDisplay from './LocationDisplay'
import CreatorDisplay from './CreatorDisplay'

function CalendarEvent({ fiEvent }) {

    return(
        <div className="event-card">
            <div className="event-date-wrapper">
                <h2 className="event-date">{ FlatironEvent.formattedDateTimeString(fiEvent) }</h2>
            </div>
            <h1 className='event-title'>{ fiEvent.title }</h1>
            <LocationDisplay locationString={fiEvent.location} />
            <CreatorDisplay personString={fiEvent.creator} />
        </div>
    );
}

export default CalendarEvent;