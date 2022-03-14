const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]

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

function getTimeString(time) {
    let hours = time.getHours();
    const ampm = hours >= 12 ? 'pm' : 'am';


    return (hours > 12 ? hours - 12 : hours).toLocaleString() 
    + ":" + time.getMinutes().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      }) + " " + ampm;
}

function getDayOfWeek(date) {
    return DAYS[date.getDay()];
}

export {isEventAllDay, isEventToday, getTimeString, getDayOfWeek}