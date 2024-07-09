import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

// styles
import "../styles/event/savedEvents.scss";

// components
import Filter from "../components/common/filter";
import Card from "../components/common/card";
import Loader from "../components/common/loader";

// utils
import { getAllRegistrations } from "../utils/event/register";

// redux
import { useSelector } from "react-redux";

const RegisteredEvents = () => {
    // global states
    const { userToken } = useSelector(state => state.user);

    // local states
    const [loading, setLoading] = useState(true);
    const [registrations, setRegistrations] = useState();

    useEffect(() => {
        const fetchUserRegistrations = async () => {
            try {
                setLoading(true);
                const response = await getAllRegistrations(userToken);
                console.log(response?.events);
                if (response) {
                    setRegistrations(response?.events);
                }
            } catch (err) {
                toast.error('Unable to load user Registrations. Please try again later.');
                console.log('Error in fetching user bookmarks:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchUserRegistrations();
    }, [])

    return (
        <div className="main align-items-start user-saved-events">
            <div><Toaster /></div>
            {/* <Header /> */}
            <div className="user-saved-events-content">
                <div className="user-saved-events-header">
                    <div className="user-saved-events-heading">Registered Events</div>
                    <Filter />
                </div>
                <div className="saved-events-list">
                    {
                        loading ? <>
                            <Loader width={'60px'} borderWidth={'6px'} color={'var(--primary)'} />
                        </> : registrations && registrations.length > 0 ? <>
                            {
                                    registrations.map((event, index) => {
                                    return (
                                        <Card key={index} event={event} />
                                    )
                                })
                            }
                        </> : <>
                            <div className="no-events">No events registered</div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default RegisteredEvents;