import React, { useEffect, useState } from 'react'
import ApiCalendar from 'react-google-calendar-api';
import AllDayBanner from './AllDayBanner';
import TodayView from './TodayView';
import UpcomingDisplay from './UpcomingDisplay';

function CalendarDisplay({isSignedIn}) {

  const NYC_CALENDAR_ID = "flatironschool.com_lhdstd62mqmo6rc96bcf9qff04@group.calendar.google.com";

  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {

    const interval = setInterval(() => {
      if (!ApiCalendar.sign) {
        return;
      }

      ApiCalendar.listUpcomingEvents(20, NYC_CALENDAR_ID)
      .then((data) => {
        setCalendarEvents(data.result.items);
      });
    }, 1000)

    return () => clearInterval(interval);

  },[]);

  function isEventAllDay(event) {
    return event && event.start && event.start.date;
  }

  function isEventToday(event) {
    if (!event) {
      return false;
    }

    if (isEventAllDay(event)) {

      const today = new Date();
      let eventDate;
      let isToday = false;
      
      if (event.start.date) {
        eventDate = new Date(event.start.date + " EST")
      } else if (event.start.dateTime) {
        eventDate = new Date(event.start.dateTime);
      }

      if (eventDate) {

        isToday = (
          eventDate.getFullYear() == today.getFullYear()
          && eventDate.getMonth() == today.getMonth()
          && eventDate.getDate() == today.getDate()
        );
      }

      return isToday;
    }
  }

  const allDayEvents = calendarEvents.filter(event => {
    return isEventAllDay(event) && isEventToday(event);
  });

  const upcomingEvents = calendarEvents.filter(event => {
    return !(isEventAllDay(event) && isEventToday(event));
  });

  const upNextEvent = upcomingEvents[0];

  return (
    <div className='calendar-display'>
      <AllDayBanner events={allDayEvents}/>
      <div className="timed-events">
        { upNextEvent ? <TodayView event={upNextEvent} /> : null }
        <UpcomingDisplay events={upcomingEvents.slice(1)} />      
      </div>
    </div>
  )
}

export default CalendarDisplay;