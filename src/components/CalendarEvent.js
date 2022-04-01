import React from 'react'
import "../styles/CalendarEvent.css"
import FlatironEvent from '../classes/FlatironEvent';
import LocationDisplay from './LocationDisplay'
import CreatorDisplay from './CreatorDisplay'
import * as dateUtils from '../utils/dateUtils'

function CalendarEvent({ fiEvent, firstOnDate }) {

    const style = {
        "visibility": firstOnDate ? "visible" : "hidden"
    };

    return(
        <div className='schedule-wrapper'>
            
            <div className='date-indicator' style={style}>
                <h3 className="day-of-week">{FlatironEvent.getDayOfWeekString(fiEvent)}</h3>
                <div className='calendar-date'>
                    <h3 className="month">{dateUtils.MONTHS[fiEvent.startDate.getMonth()][0]}</h3>
                    <h3 className="day">{fiEvent.startDate.getDay()}</h3>
                </div>
            </div>
            
            <div className="event-card">
                <div className="event-date-wrapper">
                    <h2 className="event-date">{ fiEvent.formattedTimeString() }</h2>
                </div>
                <h1 className='event-title'>{ fiEvent.title }</h1>
                <LocationDisplay locationString={fiEvent.location} />
                <CreatorDisplay personString={fiEvent.creator} />
            </div>
        </div>
    );
}

export default CalendarEvent;