import React from 'react'

function AllDayBanner({events}) {
    return (
        <div className="banner">
            {
                events.map(event => {
                    return (
                        <h2 className="all-day-event event-title" key={event.id}>{event.summary}</h2>  
                    );
                })
            }
        </div>
    );
}

export default AllDayBanner;