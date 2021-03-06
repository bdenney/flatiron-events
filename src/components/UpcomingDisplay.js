import React from 'react'
import CalendarEvent from './CalendarEvent';

function UpcomingDisplay({events}) {

    const dateBuckets = new Map();

    function bucketEvents() {
        events.forEach(event => {
            // Pull the start date of this event.
            const startDate = event.startDate;

            // Build the bucket key.
            const key = `${startDate.getYear()}-${startDate.getMonth()}-${startDate.getDate()}`

            if (dateBuckets.has(key)) {
                const bucket = dateBuckets.get(key);
                bucket.push(event);
            } else {
                dateBuckets.set(key, [event]);
            }
        });
    }

    bucketEvents();

    let eventArray = [];
    const iterator = dateBuckets.keys();
    
    let item = iterator.next();
    while (!item.done) {
        const bucketData = dateBuckets.get(item.value);

        item = iterator.next()

        bucketData.forEach((event, index) => {
            eventArray.push(<CalendarEvent key={event.id} fiEvent={event} firstOnDate={index === 0} />)
        })
        
    }
    
    return(
        <div className="upcoming-display">
            <h2 className="upcoming-title">Upcoming Events</h2>
            <ul className="event-list">
            { eventArray }
            </ul>
            <div className='content-fade'/>
        </div>
    );
}

export default UpcomingDisplay;