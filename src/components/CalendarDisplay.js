import React from 'react'
import TodayView from './TodayView';
import UpcomingDisplay from './UpcomingDisplay';

function CalendarDisplay({events}) {

  const upcomingEvents = events.filter(event => {
    return !event.isAllDay;
  });

  const upNextEvent = upcomingEvents[0];

  return (
    
    <div className='calendar-display'>
      { upNextEvent ? <TodayView fiEvent={upNextEvent} /> : null }
      { upcomingEvents.length > 0 ? <UpcomingDisplay events={upcomingEvents.slice(1)} /> : null }
    </div>
    
  )
}

export default CalendarDisplay;