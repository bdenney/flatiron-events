const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

function isEventAllDay(event) {
  return event && event.start && event.start.date;
}

function isEventToday(event) {
  if (!event) {
    return false;
  }

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

export function isEventNow(event) {
  if (!event || !isEventToday(event) || isEventAllDay(event)) {
    return false;
  }

  const now = new Date();
  const eventStartDate = new Date(event.start.dateTime);
  const eventEndDate = new Date(event.end.dateTime);
  
  return now >= eventStartDate && now <= eventEndDate;
}

export function calculateDate(event) {
  if (!event || !event.start) {
      return;
  }

  let dateStr = "";
  if (event.start && event.start.date) {
      // This is an all-day event
      dateStr += "All Day ";
      dateStr += dateStr = getDayOfWeek(new Date(event.start.date));
  } else if (event.start && event.start.dateTime) {
      const startTime = new Date(event.start.dateTime);

      if (!isEventToday(event)) {
          dateStr = getDayOfWeek(startTime);
          dateStr += " @ ";
      }

      dateStr += getTimeString(startTime);
  }
  return dateStr;
}

export function getManhattanRoom(event) {
  if (!event||!event.location) {
      return;
  }
  return event.location.replace("Manhattan-2-Manhattan - ", "").split(" ").reduce((prev, curr) => {
      if (!curr.includes("(")) {
          return prev += (" " + curr);
      } else {
          return prev;
      }
  }, "");
}

export {isEventAllDay, isEventToday, getTimeString, getDayOfWeek}