import React from 'react';
import { Grid } from '@material-ui/core';
import EventItem from './EventItem';
import InfiniteScroll from 'react-infinite-scroller';

const EventList = ({
	events,
	getNextEvents,
	loading,
	moreEvents,
	lastEvent,
}) => {
	return (
		<>
			{events && events.length !== 0 && (
				<InfiniteScroll
					pageStart={0}
					loadMore={() => getNextEvents(lastEvent)}
					hasMore={!loading && moreEvents}
					initialLoad={false}
				>
					<Grid container justify="center" alignItems="stretch" spacing={5}>
						{events &&
							events.map((event) => (
								<Grid item xs={12} sm={6} md={3} key={event.id}>
									<EventItem event={event} />
								</Grid>
							))}
					</Grid>
				</InfiniteScroll>
			)}
		</>
	);
};

export default EventList;
