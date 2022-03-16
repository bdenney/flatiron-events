import React, { useEffect, useState } from 'react'
import ApiCalendar from 'react-google-calendar-api';
import AllDayBanner from './AllDayBanner';
import TodayView from './TodayView';
import UpcomingDisplay from './UpcomingDisplay';
import FlatironEvent from '../classes/FlatironEvent';

function CalendarDisplay() {

  const NYC_CALENDAR_ID = "flatironschool.com_lhdstd62mqmo6rc96bcf9qff04@group.calendar.google.com";
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      ApiCalendar.listUpcomingEvents(20, NYC_CALENDAR_ID)
      .then((data) => {
        setEventData(data?.result?.items);
      });
    }, 1000)

    return () => clearInterval(interval);

  },[]);

  const calendarEvents = eventData.length > 0
    ? eventData.map((event) => {
        return new FlatironEvent(event);
      })
    : [];

  const allDayEvents = calendarEvents.filter(event => {
    return event.isAllDay && event.isToday;
  });

  const upcomingEvents = calendarEvents.filter(event => {
    return !(event.isAllDay && event.isToday);
  });

  const upNextEvent = upcomingEvents[0];

  return (
    
    <div className='calendar-display'>
      
      { allDayEvents.length > 0 ? <AllDayBanner events={allDayEvents}/> : null }
      <div className="timed-events">
        { upNextEvent ? <TodayView fiEvent={upNextEvent} /> : null }
        { upcomingEvents.length > 0 ? <UpcomingDisplay events={upcomingEvents.slice(1)} /> : null }
      </div>
    </div>
    
  )
}

export default CalendarDisplay;