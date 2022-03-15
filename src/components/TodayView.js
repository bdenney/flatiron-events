import React from 'react'
import CalendarEvent from './CalendarEvent';
import { isEventNow } from '../utils/dateUtils'

function TodayView({event}) {

    function isHappeningNow() {
        return isEventNow(event);
    }

    return(
        <div className="today-view">
            <h2 className='headline'>{ isHappeningNow() ? "Now" : "Next" }</h2>
            <div className="highlight-card">
                <CalendarEvent event={event} showDescription={true} />
            </div>
        </div>
    );
}

export default TodayView;