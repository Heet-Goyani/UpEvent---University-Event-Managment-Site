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

// redux
import { useSelector } from "react-redux";

const Bookmarks = () => {
    // global states
    const { userToken } = useSelector(state => state.user);

    // local states
    const [loading, setLoading] = useState(true);
    const [bookmarks, setBookmarks] = useState();

    useEffect(() => {
        const fetchUserBookmarks = async() => {
            try {
                setLoading(true);
                const response = await getAllBookmarks(userToken);
                console.log(response?.events);
                if(response){
                    setBookmarks(response?.events);
                }
            } catch(err){
                toast.error('Unable to load user bookmarks. Please try again later.');
                console.log('Error in fetching user bookmarks:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchUserBookmarks();
    }, [])

    return (
        <div className="main align-items-start user-saved-events">
            <div><Toaster /></div>
            {/* <Header /> */}
            <div className="user-saved-events-content">
                <div className="user-saved-events-header">
                    <div className="user-saved-events-heading">Bookmarked Events</div>
                    <Filter />
                </div>
                <div className="saved-events-list">
                    {
                        loading ? <>
                            <Loader width={'60px'} borderWidth={'6px'} color={'var(--primary)'} /> 
                        </> : bookmarks && bookmarks.length > 0 ? <>
                            {
                                bookmarks.map((event, index) => {
                                    return (
                                        <Card key={index} event={event} />
                                    )
                                })
                            }
                        </> : <>
                            <div className="no-events">No events bookmarked</div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Bookmarks;