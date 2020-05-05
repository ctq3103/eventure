import React, {useState} from 'react';
import { EVENTS_DATA } from '../../data/mockEventsData';
import EventsPreview from '../../components/Events/EventsPreview';

function BrowseEvents() {
    const [events] = useState(EVENTS_DATA);

    return (
        <div>
            {events.map(({id,...otherProps}) => (
                <EventsPreview key={id} {...otherProps}/>
            ))}

        </div>
    )
}

export default BrowseEvents;