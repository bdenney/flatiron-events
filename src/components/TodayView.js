import React from 'react'
import FlatironEvent from '../classes/FlatironEvent';
import CreatorDisplay from './CreatorDisplay';
import LocationDisplay from './LocationDisplay';

function TodayView({ fiEvent }) {
    return(
        <div className="today-view">
            <div className='today-header'>
                <div className='calendar-icon'>
                    <img src="./images/calendar-icon.svg"/>
                </div>
                <div className='datetime-display'>
                    <h2 className="date">{ FlatironEvent.dateString(fiEvent) }</h2>
                    <h2 className="time">{ FlatironEvent.timeString(fiEvent.startDate) }</h2>
                </div>
            </div>
            <div className='today-body'>
                <h1 className='event-title'>{ fiEvent.title }</h1>
                <div className='property-bar'>
                    <LocationDisplay locationString={fiEvent.location} />
                    <CreatorDisplay personString={fiEvent.creator} />
                </div>
                <p>{ fiEvent.description }</p>
            </div>
            <div className='content-fade'></div>
        </div>
    );
}

export default TodayView;