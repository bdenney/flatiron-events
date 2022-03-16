

function isEventAllDay(event) {
  return event && event.start && event.start.date;
}