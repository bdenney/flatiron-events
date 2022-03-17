import React from 'react'
import FlatironEvent from '../classes/FlatironEvent';
import CreatorDisplay from './CreatorDisplay';
import LocationDisplay from './LocationDisplay';

function TodayView({ fiEvent }) {
    return(
        <div className="today-view">
            <h2 className="date">{ FlatironEvent.dateString(fiEvent) }</h2>
            <h1 className='event-title'>{ fiEvent.title }</h1>
            <div className='property-bar'>
                <LocationDisplay locationString={fiEvent.location} />
                <CreatorDisplay personString={fiEvent.creator} />
            </div>
            <p>{ fiEvent.description }</p>
            <div className="content-fade-out"></div>
        </div>
    );
}

export default TodayView;