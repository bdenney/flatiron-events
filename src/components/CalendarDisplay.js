import React, { useEffect, useState } from 'react'
import ApiCalendar from 'react-google-calendar-api';
import CalendarEvent from './CalendarEvent';

function CalendarDisplay({isSignedIn}) {
    const NYC_CALENDAR_ID = "flatironschool.com_lhdstd62mqmo6rc96bcf9qff04@group.calendar.google.com";

  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    if (!ApiCalendar.sign) {
      console.log("User not signed in – bailing...");
      return;
    }

    ApiCalendar.listUpcomingEvents(20, NYC_CALENDAR_ID)
    .then((data) => {
      // Update the upcoming events.
      setCalendarEvents(data.result.items);

      console.log(data.result.items)
    });

  },[isSignedIn]);

    return (
        <div className='calendar-display'>
            <h2 className="headline">Upcoming</h2>
            <ul className="event-list">
            {
                calendarEvents.map(event => {
                    return <CalendarEvent key={event.id} event={event} />
                })
            }
            </ul>
        </div>
    )
}

export default CalendarDisplay;