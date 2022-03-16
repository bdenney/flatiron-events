import React from 'react'
import {isEventToday, getManhattanRoom, getTimeString, getDayOfWeek, isEventNow, calculateDate} from '../utils/eventUtils';

function CalendarEvent({event}) {

    function getCreatorInfo() {
        if (!event || !event.creator) {
            return;
        }
        return event.creator.displayName ? event.creator.displayName : event.creator.email;
    }

    function getManhattanRoom() {
        if (!event||!event.location) {
            return;
        }
        return event.location.replace("Manhattan-2-Manhattan - ", "").split(" ").reduce((prev, curr) => {
            if (!curr.includes("(")) {
                return prev += (" " + curr);
            } else {
                return prev;
            }
        }, "");
    }

    return(
        <div className="event-card">
            <h1 className='event-title'>{event ? event.summary : null}</h1>
            <h2>{calculateDate()}</h2>
            { isEventToday(event) ? <h2>{getManhattanRoom()}</h2> : null }
        </div>
    );
}

export default CalendarEvent;