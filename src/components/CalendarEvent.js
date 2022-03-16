import React from 'react'
import FlatironEvent from '../classes/FlatironEvent';

function CalendarEvent({ event }) {

    const fiEvent = new FlatironEvent(event);

    return(
        <div className="event-card">
            <h1 className='event-title'>{event ? event.summary : null}</h1>
            <h2>{ FlatironEvent.dateString(fiEvent) }</h2>
            { fiEvent.isToday ? <h2>{ fiEvent.location }</h2> : null }
        </div>
    );
}

export default CalendarEvent;