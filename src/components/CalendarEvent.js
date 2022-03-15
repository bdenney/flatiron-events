import React from 'react'
import {isEventToday, getTimeString, getDayOfWeek} from '../utils/dateUtils';

function CalendarEvent({event, showDescription=false}) {

    function calculateDate() {
        if (!event || !event.start) {
            return;
        }

        let dateStr = "";
        if (event.start && event.start.date) {
            // This is an all-day event
            dateStr += "All Day ";
            dateStr += dateStr = getDayOfWeek(new Date(event.start.date));
        } else if (event.start && event.start.dateTime) {
            const startTime = new Date(event.start.dateTime);

            if (!isEventToday(event)) {
                dateStr = getDayOfWeek(startTime);
                dateStr += " @ ";
            }

            dateStr += getTimeString(startTime);
        }
        return dateStr;
    }

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

    calculateDate();

    return(
        <div className="event-card">
            <h1 className='event-title'>{event ? event.summary : null}</h1>
            <h2>{calculateDate()}</h2>
            { isEventToday(event) ? <h2>{getManhattanRoom()}</h2> : null }
            <p>{showDescription ? event.description : null}</p>
        </div>
    );
}

export default CalendarEvent;