import React from 'react'
import FlatironEvent from '../classes/FlatironEvent';

function TodayView({ fiEvent }) {

    return(
        <div className="today-view">
            <h2>{ FlatironEvent.dateString(fiEvent) }</h2>
            <h1 className='event-title'>{ fiEvent.title }</h1>
            <h2>{ fiEvent.location }</h2>
            <p>{ fiEvent.description }</p>
        </div>
    );
}

export default TodayView;