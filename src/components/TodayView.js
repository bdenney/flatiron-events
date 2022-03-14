import React from 'react'
import CalendarEvent from './CalendarEvent';

function TodayView({event}) {

    function isHappeningNow() {
        // TODO: figure out whether this event is happening now or is 'next'.
        return false;
    }

    return(
        <>
            <h2 className='headline'>{ isHappeningNow() ? "Now" : "Next" }</h2>
            <div className="highlight-card">
                <CalendarEvent event={event} />
            </div>
        </>
    );
}

export default TodayView;