import React from 'react'
import CalendarEvent from './CalendarEvent';

function UpcomingDisplay({events}) {
    
    return(
        <div className="upcoming-display">
            <h2 className="headline">Upcoming</h2>
            <ul className="event-list">
            {
                events.map(event => {
                    return <CalendarEvent key={event.id} fiEvent={event} />
                })
            }
            </ul>
        </div>
    );
}

export default UpcomingDisplay;