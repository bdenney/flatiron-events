import './App.css';
import ApiCalendar from 'react-google-calendar-api';
import Header from "./components/Header"
import CalendarDisplay from "./components/CalendarDisplay"
import FlatironEvent from './classes/FlatironEvent';
import { useState, useEffect } from 'react';

const NYC_CALENDAR_ID = "flatironschool.com_lhdstd62mqmo6rc96bcf9qff04@group.calendar.google.com";

function App() {
  const [eventData, setEventData] = useState([]);

  const [calendarLoaded, setCalendarLoaded] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    ApiCalendar.onLoad(() => {
        setCalendarLoaded(true)
        setSignedIn(ApiCalendar.gapi.auth2.getAuthInstance().isSignedIn.Nb)
    })
  }, [])

  useEffect(() => {
    if (!(calendarLoaded && signedIn)) return;

    const interval = setInterval(() => {
      ApiCalendar.listUpcomingEvents(20, NYC_CALENDAR_ID)
      .then((data) => {
        setEventData(data?.result?.items);
      });
    }, 1000)

    return () => clearInterval(interval);
  },[signedIn, calendarLoaded]);

  const calendarEvents = eventData.length > 0
    ? eventData.map((event) => {
        return new FlatironEvent(event);
      })
    : [];

  const allDayEvents = calendarEvents.filter(event => {
    return event.isAllDay && event.isToday;
  });

  function handleLoginClick() {
    ApiCalendar.handleAuthClick()
    .then(() => {
      setSignedIn(true);
    })
    .catch(() => {
      setSignedIn(false)
    })
  }

  return (
    <div className="App">
      {
        signedIn 
        ? <>
            <Header allDayEvents={allDayEvents} />
            <CalendarDisplay events={calendarEvents} />
          </>
        : calendarLoaded 
          ? <><button onClick={handleLoginClick}>Sign in</button></>
          : null
      }
    </div>
    
  );
}

export default App;
