import React from 'react'
import FlatironEvent from '../classes/FlatironEvent';

function CalendarEvent({ fiEvent }) {

    return(
        <div className="event-card">
            <h1 className='event-title'>{ fiEvent.title }</h1>
            <h2>{ FlatironEvent.dateString(fiEvent) }</h2>
            { fiEvent.isToday ? <h2>{ fiEvent.location }</h2> : null }
        </div>
    );
}

export default CalendarEvent;