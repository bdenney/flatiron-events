import React, { useEffect, useState } from 'react'
import ApiCalendar from 'react-google-calendar-api';
import CalendarEvent from './CalendarEvent';
import Footer from './Footer';
import TodayView from './TodayView';
import UpcomingDisplay from './UpcomingDisplay';

function CalendarDisplay({isSignedIn}) {

  const NYC_CALENDAR_ID = "flatironschool.com_lhdstd62mqmo6rc96bcf9qff04@group.calendar.google.com";

  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    if (!ApiCalendar.sign) {
      return;
    }

    ApiCalendar.listUpcomingEvents(20, NYC_CALENDAR_ID)
    .then((data) => {
      // Update the upcoming events.
      setCalendarEvents(data.result.items);

      console.log(data.result.items)
    });

  },[isSignedIn]);

  const upNext = calendarEvents[0];

  return (
    <div className='calendar-display'>
      { upNext ? <TodayView event={upNext} /> : null }
      <UpcomingDisplay events={calendarEvents.slice(1)} />      
    </div>
  )
}

export default CalendarDisplay;