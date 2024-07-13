import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';

// styles
import "../../styles/organiser/myEvent.scss";

// components
import OrganiserEventCard from "../../components/organiser/card";
import Loader from "../../components/common/loader";

// utils
import { getOrganiserEvents } from "../../utils/common/organiserEvents";

// redux
import { useSelector } from "react-redux";

const MyEvent = () => {
    const { organiserToken, organiserData } = useSelector(state => state.organiser);
    const [events, setEvents] = useState();
    const [loadPage, setLoadPage] = useState(true);
    const [eventsChanged, setEventsChanged] = useState(0);

    useEffect(() => {
        const fetchEvents = async () => {
            console.log('fetching events');
            try {
                setLoadPage(true);
                const response = await getOrganiserEvents({ organiserCollege: organiserData?.name });
                setEvents(response?.events);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadPage(false);
            }
        }

        if (organiserToken) fetchEvents();
    }, [organiserToken, eventsChanged]);

    return loadPage ? (
        <div className='d-flex justify-content-center align-items-center' style={{ width: '100%', height: '100%' }}>
            <CircularProgress style={{ color: 'var(--primary)' }} />
        </div>
    ) : (
        <>
            <div id="myEvent" className="pb-3">
                <div className="myEvent-heading">My Events</div>
                <div className="events-list mt-4">
                    {
                        events?.length > 0 ? (
                                events?.map((item, index) => (
                                    <OrganiserEventCard
                                        key={index}
                                        item={item}
                                        setEventsChanged={setEventsChanged}
                                    />
                                ))
                        ) : (
                            <div className="no-events">No events created</div>
                        )
                    }
                </div>
            </div>
        </>
    )
};

export default MyEvent;
