const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

class FlatironEvent {
    // Hardcoding to EST since this app is for NYC campus, but could be configurable in the future.
    #TIME_ZONE = "EST";

    #gCalEvent;
    #startDate;
    #endDate;
    #location;
    #creator;
    #description;

    constructor (gCalEvent) {
        if (!gCalEvent) {
            throw 'gCal event required!';
        }
        
        this.#gCalEvent = gCalEvent;
        this.#generateStartDate();
        this.#generateEndDate();
        this.#generateLocation();
        this.#generateCreator();
        this.#generateDescription();
    }

    get id() {
        return this.#gCalEvent.id;
    }

    get startDate() {
        return this.#startDate;
    }

    get endDate() {
        return this.#endDate;
    }

    get isNow() {
        const now = new Date();
        return now >= this.startDate && now <= this.endDate;
    }

    get isToday() {
        const today = new Date();
        return (
            this.startDate.getFullYear() == today.getFullYear()
            && this.startDate.getMonth() == today.getMonth()
            && this.startDate.getDate() == today.getDate()
        );
    }

    get isTomorrow() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        return (
            this.startDate.getFullYear() === tomorrow.getFullYear()
            && this.startDate.getMonth() === tomorrow.getMonth()
            && this.startDate.getDate() === tomorrow.getDate()
        );
    }

    get isThisWeek() {
        // Get today's day.
        const today = new Date();
        const day = today.getDay();

        // Subtract from Friday (5) to see how many days are left this week.
        const daysLeftThisWeek = 5 - day;

        // Create a new Date object for the end of this week.
        const endOfThisWeek = new Date();
        endOfThisWeek.setDate(today.getDate() + daysLeftThisWeek);

        return (
            this.startDate.getFullYear() <= endOfThisWeek.getFullYear()
            && this.startDate.getMonth() <= endOfThisWeek.getMonth()
            && this.startDate.getDate() <= endOfThisWeek.getDate()
        )
    }

    get dayOfWeek() {
        return DAYS[this.startDate.getDay()];
    }

    get location() {
        return this.#location;
    }

    get isAllDay() {
        return this.#gCalEvent.start.date;
    }

    get creator() {
        return this.#creator;
    }

    get title() {
        return this.#gCalEvent.summary;
    }

    get description() {
        return this.#description;
    }

    static timeString(dateTime) {
        let hours = dateTime.getHours();
        const ampm = hours >= 12 ? 'pm' : 'am';
      
      
        return (hours > 12 ? hours - 12 : hours).toLocaleString() 
        + ":" + dateTime.getMinutes().toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          }) + " " + ampm;
    }

    static dateString(fiEvent) {
        let dateStr = '';
        if (fiEvent.isToday) {
            dateStr = "Today";
        } else if (fiEvent.isTomorrow) {
            dateStr += "Tomorrow";
        }  else if (fiEvent.isThisWeek) {
            dateStr += fiEvent.dayOfWeek;
        } else {
            // dateStr += fiEvent.startDate.toLocaleString('en-US');
            dateStr += MONTHS[fiEvent.startDate.getMonth()] + " "
            dateStr += fiEvent.startDate.getDate();

            switch (fiEvent.startDate.getDate()) {
                case 1:
                    dateStr += "st";
                    break;
                case 2:
                    dateStr += "nd";
                    break;
                case 3:
                    dateStr += "rd";
                    break;
                default:
                    dateStr +=  "th";
            }
        }
        return dateStr;
    }

    static getDayOfWeekString(fiEvent) {
        let dateStr = "";
        if (fiEvent.isAllDay) {
            dateStr += "All Day ";
            dateStr += fiEvent.dayOfWeek;
        } else {

            if (fiEvent.isToday) {
                dateStr = "Today";
            } else if (fiEvent.isTomorrow) {
                dateStr += "Tomorrow"
            }  else {
                dateStr += fiEvent.dayOfWeek
            } 
        }

        return dateStr;
    }

    static formattedDateTimeString(fiEvent) {
        let dateStr = "";
        if (fiEvent.isAllDay) {
            dateStr += "All Day ";
            dateStr += fiEvent.dayOfWeek;
        } else {

            if (fiEvent.isToday) {
                dateStr = "Today @ ";
            } else if (fiEvent.isTomorrow) {
                dateStr += "Tomorrow @ "
            }  else if (fiEvent.isThisWeek) {
                dateStr += fiEvent.dayOfWeek + " @ "
            } else {
                // dateStr += fiEvent.startDate.toLocaleString('en-US');
                dateStr += MONTHS[fiEvent.startDate.getMonth()] + " "
                dateStr += fiEvent.startDate.getDate();

                switch (fiEvent.startDate.getDate()) {
                    case 1:
                        dateStr += "st";
                        break;
                    case 2:
                        dateStr += "nd";
                        break;
                    case 3:
                        dateStr += "rd";
                        break;
                    default:
                        dateStr +=  "th";
                }

                dateStr += " @ "
            }
        
            dateStr += FlatironEvent.timeString(fiEvent.startDate);
        }
        return dateStr;
    }

    #generateStartDate() {
        if (this.#startDate) {
            // Already calculated – bail.
            return;
        }

        if (this.#gCalEvent?.start?.dateTime) {
            this.#startDate = new Date(this.#gCalEvent.start.dateTime)
        } else if (this.#gCalEvent?.start?.date) {
            // Need to append the time zone to properly calculate whether it's today.
            this.#startDate = new Date(this.#gCalEvent.start.date + this.#TIME_ZONE);
        } else {
            // TODO: probably something?
            console.error("Unknown gCal event structure :o. Found: ", this.#gCalEvent);
        }
    }

    #generateEndDate() {
        if (this.#endDate) {
            // Already calculated – bail.
            return;
        }

        if (this.#gCalEvent?.end?.dateTime) {
            this.#endDate = new Date(this.#gCalEvent.end.dateTime);
        } else if (this.#gCalEvent?.end?.date) {
            // Need to append the time zone to properly calculate whether it's today.
            this.#endDate = new Date(this.#gCalEvent.end.date + this.#TIME_ZONE);
        } else {
            // TODO: probably something?
            console.error("Unknown gCal event structure :o. Found: ", this.#gCalEvent);
        }
    }

    #generateLocation() {
        const rawLocationString = this.#gCalEvent.location;

        if (!rawLocationString) {
            this.#location = "";
        } else if (rawLocationString.includes("Manhattan-2-Manhattan - ")) {
            this.#location = this.#gCalEvent.location.replace("Manhattan-2-Manhattan - ", "")
                .split(" ")
                .reduce((prev, curr) => {
                    if (!curr.includes("(")) {
                        return prev += (" " + curr);
                    } else {
                        return prev;
                    }
            }, "");    
        } else if (rawLocationString.includes("https://flatironschool.zoom.us/j/")) {
            // Virtual event!
            this.#location = "Virtual";
        } else {
            // By default just take whatever is there.
            this.#location = rawLocationString;
        }
    }

    #generateCreator() {
        if (!this.#gCalEvent.creator) {
            this.#creator = "";
        } else {
            this.#creator = this.#gCalEvent.creator.displayName 
                            ? this.#gCalEvent.creator.displayName 
                            : this.#gCalEvent.creator.email;
        }
    }

    #generateDescription() {
        if (!this.#gCalEvent.description) return;
        // Remove all html tags.
        this.#description = this.#gCalEvent.description.replace( /(<([^>]+)>)/ig, ' ');

        // Parse any encoded elements.
        const htmlElement = document.createElement('html');
        htmlElement.innerHTML = this.#description;
        this.#description = htmlElement.textContent;

        // Remove all the zoom invite information if it exists.
        const zoomRegexStr = /\w+(?=\s+\w+(?=\s+is inviting you to a scheduled Zoom meeting.))/gm
        let matches = zoomRegexStr.exec(this.#description);
        if (matches) {
            let index = matches.index;
            this.#description = this.#description.substring(0, index);
            console.log(this.#description)
        }
    }
}

export default FlatironEvent;