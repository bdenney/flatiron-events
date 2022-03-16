import React from 'react'
import { isEventNow, isEventToday, calculateDate, getManhattanRoom, getTimeString, getDayOfWeek } from '../utils/eventUtils'

function TodayView({event}) {

    function buildWhenString() {
        let whenString = "";

        if (isEventNow(event)) {
            whenString += "Happening Now" 
        } else if (isEventToday(event)) {
            whenString += getDayOfWeek(new Date(event.start.dateTime));
        } else {
            
        }
    }

    return(
        <div className="today-view">
            <h2>{buildWhenString()}</h2>
            <h1 className='event-title'>{event ? event.summary : null}</h1>
            <h2>{calculateDate()}</h2>
            <h2>{getManhattanRoom()}</h2>
            <p>{event.description ? event.description : null}</p>
        </div>
    );
}

export default TodayView;