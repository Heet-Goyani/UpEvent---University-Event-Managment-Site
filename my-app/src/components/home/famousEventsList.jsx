import React, { useState, useEffect, useRef } from 'react';

// styles
import '../../styles/home/home.css';

// components
import Card from '../common/card';
import Filter from '../common/filter';
import Loader from '../common/loader';

const FamousEventsList = ({ events, loading, setLoading }) => {
    const [visibleCnt, setVisibleCnt] = useState(3);            // visible count for list 1
    const [filteredEvents, setFilteredEvents] = useState();     // public filtered events
    const [filterTypes, setFilterTypes] = useState({            // filter types for public events
        'availability': [],
        'genre': [],
        'startDate': null,
        'endDate': null,
        'run': true,
    });

    // filteration effect for public events
    useEffect(() => {
        const filterEvents = () => {
            setLoading(true);
            const filtered = events?.filter(event => {
                const dateTime = new Date(event?.date.slice(0, 11) + event?.time + event?.date.slice(19, 23));
                if (
                    (filterTypes.availability.length == 0 || filterTypes.availability.includes(event?.available)) &&
                    (filterTypes.genre.length == 0 || filterTypes.genre.includes(event?.genre)) &&
                    (filterTypes.startDate == null || dateTime >= new Date(filterTypes.startDate)) &&
                    (filterTypes.endDate == null || dateTime <= new Date(filterTypes.endDate))
                ) return true;

                return false;
            })
            setFilteredEvents(filtered);
            setVisibleCnt(3);
            setLoading(false);
        };

        filterEvents();
    }, [events, filterTypes]);

    // load more events
    const loadMorePublicEvents = () => {
        setVisibleCnt(prev => Math.min(prev + 3, filteredEvents.length));
    };

    return (
        <>
            <div className='header'>
                <div className='heading-p1'>Famous <span className='heading-p2'>Events</span></div>
                <Filter filterTypes={filterTypes} setFilterTypes={setFilterTypes} upcoming={false} />
            </div>
            {
                loading ? (
                    <div className='loader-container'>
                        <Loader width={'60px'} borderWidth={'6px'} color={'var(--primary)'} />
                    </div>
                ) : (
                    <div className='events-content'>
                        {filteredEvents?.length > 0 ? (
                            <>
                                {filteredEvents.slice(0, visibleCnt).map((event, index) => (
                                    <Card key={index} event={event} />
                                ))}
                                {visibleCnt < filteredEvents.length && (
                                    <button className='btn btn-fill d-flex align-self-center align-items-center' style={{ marginTop: '10px' }} onClick={loadMorePublicEvents}>Load More...</button>
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

export default FamousEventsList;
