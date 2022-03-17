import './App.css';
import ApiCalendar from 'react-google-calendar-api';
import Header from "./components/Header"
import Footer from './components/Footer';
import CalendarDisplay from "./components/CalendarDisplay"
import BlurredBackgroundHero from './components/BlurredBackgroundHero';
import FlatironEvent from './classes/FlatironEvent';
import { useState, useEffect } from 'react';

const NYC_CALENDAR_ID = "flatironschool.com_lhdstd62mqmo6rc96bcf9qff04@group.calendar.google.com";

function App() {
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

  return (
    <div className="App">
      <Header />
      <CalendarDisplay events={calendarEvents} />
      <Footer allDayEvents={allDayEvents} />
      <BlurredBackgroundHero/>
    </div>
    
  );
}

export default App;
