import React from 'react'
import FlatironEvent from '../classes/FlatironEvent';

function TodayView({ event }) {

    const fiEvent = new FlatironEvent(event);

    function buildWhenString() {
        let whenString = "";

        if (fiEvent.isNow) {
            whenString += "Happening Now" 
        } else if (fiEvent.isToday) {
            whenString += fiEvent.dayOfWeek;
        } else {
            
        }
    }

    return(
        <div className="today-view">
            <h2>{ buildWhenString() }</h2>
            <h1 className='event-title'>{event ? event.summary : null}</h1>
            <h2>{ FlatironEvent.dateString(fiEvent) }</h2>
            <h2>{ fiEvent.location }</h2>
            <p>{event.description ? event.description : null}</p>
        </div>
    );
}

export default TodayView;