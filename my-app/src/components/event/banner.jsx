import React, { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

// assets
import { images } from "../../assets/images";

// components
import Loader from "../common/loader";

// styles
import '../../styles/event/banner.scss';

// utils
import { handleDate, handleTime } from "../../utils/common/format";
import { eventBookmark, checkBookmark } from "../../utils/event/bookmark";
import { registerEvent, checkRegistration } from '../../utils/event/register';

// navigation
import { useNavigate } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

const EventBanner = (props) => {
    // global states
    const { userToken } = useSelector(state => state.user);

    // local states
    const [register, setRegister] = useState(false);
    const [registering, setRegistering] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [bookmarking, setBookmarking] = useState(false);
    const [eventUrl, setEventUrl] = useState('');
    
    // navigation
    const navigate = useNavigate();

    useEffect(() => {
        const RegisterStatus = async () => {
            try {
                setRegistering(true);
                const response = await checkRegistration(props?.eventID, userToken);
                setRegister(response?.status);
            } catch (err) {
                console.error(err);
            } finally {
                setRegistering(false);
            }
        }

        const BookmarkStatus = async () => {
            try {
                setBookmarking(true);
                const response = await checkBookmark(props?.eventID, userToken);
                setBookmark(response?.status);
            } catch (err) {
                console.error(err);
            } finally {
                setBookmarking(false);
            }
        };
        if(userToken){
            RegisterStatus();
            BookmarkStatus();
        }
    }, [props?.eventID]);

    const handleRegistration = async (id, userToken) => {
        if (registering) return;
        try {
            setRegistering(true);

            const response = await registerEvent(id, userToken);
            if(response.message == 'Unauthorized') {
                toast.error('Please login to register for the event');
                setRegistering(false);
                return;
            }
            // timeout set in order to reduce server load
            setTimeout(() => {
                setRegister((prevRegister) => !prevRegister);
                toast.success(response.message, {
                    duration: 1000,
                });
                setRegistering(false);
            }, 1000);
        } catch (err) {
            console.error(err);
            setRegistering(false);
        }
    }

    const handleBookmark = async (id, userToken) => {
        if (bookmarking) return;
        try {
            setBookmarking(true);

            const response = await eventBookmark(id, userToken);
            if (response.message == 'Unauthorized') {
                toast.error('Please login to bookmart this event');
                setBookmarking(false);
                return;
            }
            // timeout set in order to reduce server load
            setTimeout(() => {
                setBookmark((prevBookmark) => !prevBookmark);
                toast.success(response.message, {
                    duration: 1000,
                });
                setBookmarking(false);
            }, 1000);
        } catch (err) {
            console.error(err);
            setBookmarking(false);
        }
    }

    const mergeDateAndTime = (dateString, timeString) => {
        const date = new Date(dateString);

        const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
        const formattedTime = timeString.replace(/:/g, '');

        return `${formattedDate}T${formattedTime}`;
    };
    const handleAddToCalendar = () => {
        try {
            const title = encodeURIComponent(props?.name);
            const dateTime = mergeDateAndTime(props?.date, props?.time);
            const description = encodeURIComponent(props?.description);
            const location = encodeURIComponent(props?.venue);

            const generatedUrl = `https://www.google.com/calendar/event?action=TEMPLATE&text=${title}&dates=${dateTime}/${dateTime}&details=${description}&location=${location}`;
            window.open(generatedUrl, '_blank', 'noopener,noreferrer');
        } catch (err) {
            console.log("Error in Add to Calendar Link: ",err);
        }
    };

    return (
        // add this  -> props?.coverImage || in backgroundImage after you are done testing
        <div className="event-banner-container" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1674574124345-02c525664b65?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")` }}>
            <div><Toaster /></div>
            <div className="description-box">
                <div className='btnBox mb-5 mt-4'>
                    <button
                        className='btn btn-fill mx-0'
                        onClick={() => {
                            navigate(-1);
                            // navigate('/', { replace: true });
                            // useful for clearing the current page from the history
                        }}>
                        <i className="bi bi-chevron-left"></i>
                        <span className="p-2">Back</span>
                    </button>
                </div>
                <div className="name mt-5">{props?.name}</div>
                <div className="organiser">{props?.organiserCollege}</div>
                <div className="desc mb-auto pr-2">{props?.description}</div>
            </div>
            <div className="event-register-box mx-auto p-4 justify-content-between">
                <div className="date-time">
                    <div className="dt-heading">Date & Time</div>
                    <div className="dt-content">{handleDate(props?.date, 1)}, {handleTime(props?.time)}</div>
                    <div className="dt-add" onClick={handleAddToCalendar}>
                        Add to Calendar
                    </div>
                </div>
                <div className="register-box">
                    <button
                        className="btn btn-fill btn-register d-flex align-items-center justify-content-center"
                        style={
                            register
                                ? { backgroundColor: 'rgba(0,0,0,0.5)', boxShadow: 'none' }
                                : { backgroundColor: 'var(--primary)' }
                        }
                        onClick={() => {
                            handleRegistration(props?.eventID, userToken);
                        }}
                        disabled={registering}
                    >
                        {
                            registering ? (
                                <Loader width={'1.25rem'} borderWidth={'2px'} color={'var(--white)'} />
                            ) : <>
                                {
                                    register ? (
                                        <i className="bi bi-calendar2-x-fill icon"></i>
                                    ) : (
                                        <i className="bi bi-calendar4-week icon"></i>
                                    )
                                }
                                <span className="px-2">{register ? 'Unregister' : 'Register'}</span>
                            </>
                        }
                    </button>
                    <button
                        className="btn btn-fill btn-register mx-0 w-100 d-flex align-items-center justify-content-center"
                        style={
                            bookmark
                                ? { backgroundColor: 'rgba(0,0,0,0.5)', boxShadow: 'none' }
                                : { backgroundColor: 'var(--primary)' }
                        }
                        onClick={() => {
                            handleBookmark(props?.eventID, userToken)
                        }}
                        disabled={bookmarking}
                    >
                        {
                            bookmarking ? (
                                <Loader width={'1.25rem'} borderWidth={'2px'} color={'var(--white)'} />
                            ) : <>
                                {
                                    bookmark ? (
                                        <i className="bi bi-bookmark-fill icon"></i>
                                    ) : (
                                        <i className="bi bi-bookmark icon"></i>
                                    )
                                }
                                <span className="p-2">{bookmark ? 'Unbookmark' : 'Bookmark'}</span>
                            </>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EventBanner;