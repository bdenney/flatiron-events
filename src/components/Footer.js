import React, { useEffect, useState } from 'react'

function Footer() {

    const MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    const [time, setTime] = useState(new Date());

    function getDateString() {
        let cardinal;
        switch (time.getDate()) {
            case 1:
                cardinal = "st";
                break;
            case 2:
                cardinal = "nd";
                break;
            case 3:
                cardinal = "rd";
                break;
            default:
                cardinal = "th";
                break;
        }

        return `${MONTHS[time.getMonth()]} ${time.getDate() + cardinal}`
    }

    function getTimeString() {
        let hours = time.getHours();
        const ampm = hours >= 12 ? 'pm' : 'am';


        return (hours > 12 ? hours - 12 : hours).toLocaleString() 
        + ":" + time.getMinutes().toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          }) + " " + ampm;
    }

    useEffect(() => {
        const timerId = setTimeout(() => {
            setTime(new Date());
        }, 1000);
        return () => clearTimeout(timerId);
    }, [time]);

    return (
        <div className="footer">
            <h2 className="date">{ getDateString() }</h2>
            <h2 className="time">{ getTimeString() }</h2>
        </div>
    );
}

export default Footer;