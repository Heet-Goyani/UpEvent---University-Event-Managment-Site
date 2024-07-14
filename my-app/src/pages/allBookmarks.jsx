import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

// styles
import "../styles/event/savedEvents.scss";

// components
import Filter from "../components/common/filter";
import Card from "../components/common/card";
import Loader from "../components/common/loader";

// utils
import { getAllBookmarks } from "../utils/event/bookmark";
import { mergeDateAndTime } from "../utils/common/format";

// redux
import { useSelector } from "react-redux";

const Bookmarks = () => {
    // global states
    const { userToken } = useSelector(state => state.user);

    // local states
    const [loading, setLoading] = useState(true);
    const [bookmarks, setBookmarks] = useState();
    const [filteredEvents, setFilteredEvents] = useState();
    const [filterTypes, setFilterTypes] = useState({
        'availability': [],
        'genre': [],
        'startDate': null,
        'endDate': null,
        'run': true,
    })
    const [loadPage, setLoadPage] = useState(true);

    useEffect(() => {
        const fetchUserBookmarks = async () => {
            try {
                setLoading(true);
                const response = await getAllBookmarks(userToken);
                if (response) {
                    setBookmarks(response?.events);
                }
            } catch (err) {
                toast.error('Unable to load user bookmarks. Please try again later.');
                console.log('Error in fetching user bookmarks:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchUserBookmarks();
    }, [])

    useEffect(() => {
        if (bookmarks?.length > 0) {
            setLoading(true);
            const filtered = bookmarks?.filter(event => {
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
            setLoading(false);
        }
    }, [bookmarks, filterTypes])

    useEffect(() => {
        setTimeout(() => {
            setLoadPage(false);
        }, 1000);
    });

    return loadPage ? (
        <div className='d-flex justify-content-center align-items-center' style={{ width: '100vw', height: '100vh' }}>
            <Loader width={'80px'} borderWidth={'8px'} color={'var(--primary)'} />
        </div>
    ) : (
        <div className="main align-items-start user-saved-events">
            <div><Toaster /></div>
            <div className="user-saved-events-content">
                <div className="user-saved-events-header">
                    <div className="user-saved-events-heading">Bookmarked Events</div>
                    <Filter filterTypes={filterTypes} setFilterTypes={setFilterTypes} />
                </div>
                <div className="saved-events-list">
                    {
                        loading ? <>
                            <div className='d-flex justify-content-center align-items-center' style={{ width: '100vw', height: '100vh' }}>
                                <Loader width={'60px'} borderWidth={'6px'} color={'var(--primary)'} />
                            </div>
                        </> : filteredEvents && filteredEvents.length > 0 ? <>
                            {
                                filteredEvents.map((event, index) => {
                                    return (
                                        <Card key={index} event={event} />
                                    )
                                })
                            }
                        </> : <>
                            <div className="no-events">No events available</div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Bookmarks;