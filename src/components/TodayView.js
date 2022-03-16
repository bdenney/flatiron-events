import React from 'react'
import FlatironEvent from '../classes/FlatironEvent';
import LocationDisplay from './LocationDisplay';

function TodayView({ fiEvent }) {

    return(
        <div className="today-view">
            <h2 className="date">{ FlatironEvent.dateString(fiEvent) }</h2>
            <h1 className='event-title'>{ fiEvent.title }</h1>
            {
                fiEvent.location
                ? <LocationDisplay locationString={fiEvent.location} />
                : null
            }
            <p>{ fiEvent.description }</p>
        </div>
    );
}

export default TodayView;