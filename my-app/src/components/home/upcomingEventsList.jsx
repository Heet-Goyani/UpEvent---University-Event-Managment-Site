import React, { useState, useEffect, useRef } from 'react';

// styles
import '../../styles/home/home.css';

// components
import Card from '../common/card';
import Loader from '../common/loader';

const UpcomingEventsList = ({ events, loading }) => {
    const [visibleCnt, setVisibleCnt] = useState(3);        // visible count for list 2

    // load more upcoming events
    const loadMoreUpcomingEvents = () => {
        setVisibleCnt(prev => Math.min(prev + 3, events.length));
    }

    return (
        <>
            <div className='header'>
                <div className='heading-p1'>Upcoming <span className='heading-p2'>Events</span></div>
            </div>
            {
                loading ? (
                    <div className='loader-container'>
                        <Loader width={'60px'} borderWidth={'6px'} color={'var(--primary)'} />
                    </div>
                ) : (
                    <div className='events-content'>
                        {events?.length > 0 ? (
                            <>
                                {events?.slice(0, visibleCnt).map((event, index) => (
                                    <Card key={index} event={event} />
                                ))}
                                {visibleCnt < events?.length && (
                                    <button className='btn btn-fill d-flex align-self-center align-items-center' style={{ marginTop: '10px' }} onClick={loadMoreUpcomingEvents}>Load More...</button>
                                )}
                            </>
                        ) : (
                            <div className='no-events'>No events available</div>
                        )}
                    </div>
                )
            }
        </>
    )
};

export default UpcomingEventsList;