import React from 'react'

function CalendarEvent({event}) {
    // person who made event: event.creator.email / .displayName

    // title: event.summary

    // time: event.start.date / event.end.date

    // room: location


    function calculateDate() {
        let dateStr = "";
        if (event.start && event.start.date) {
            // This is an all-day event
            dateStr += "All Day ";
            dateStr += event.start.date;
        } else if (event.start && event.start.dateTime) {
            dateStr += new Date(event.start.dateTime).toLocaleDateString();
            dateStr += " – ";
            dateStr += new Date(event.end.dateTime).toLocaleDateString();
        }
        return dateStr;s
    }

    function getCreatorInfo() {
        if (!event.creator) {
            return;
        }
        return event.creator.displayName ? event.creator.displayName : event.creator.email;
    }

    function getManhattanRoom() {
        if (!event.location) {
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
            <h2>{event.summary}</h2>
            <h4>{getCreatorInfo()}</h4>
            <h4>{getManhattanRoom()}</h4>
            <h6>{calculateDate()}</h6>
        </div>
    );
}

export default CalendarEvent;