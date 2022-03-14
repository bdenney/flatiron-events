import React from 'react'

function CalendarEvent({event}) {
    
    function calculateDate() {
        if (!event || !event.start) {
            return;
        }

        let dateStr = "";
        if (event.start && event.start.date) {
            // This is an all-day event
            dateStr += "All Day ";
            dateStr += new Date(event.start.date);
        } else if (event.start && event.start.dateTime) {
            dateStr += new Date(event.start.dateTime).toLocaleDateString();
            dateStr += " – ";
            dateStr += new Date(event.end.dateTime).toLocaleDateString();
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
            <h2>{event ? event.summary : null}</h2>
            <h4>{getCreatorInfo()}</h4>
            <h4>{getManhattanRoom()}</h4>
            <h6>{calculateDate()}</h6>
        </div>
    );
}

export default CalendarEvent;