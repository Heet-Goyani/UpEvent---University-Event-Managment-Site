import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

// styles
import '../../styles/common/card.scss';

// components
import Loader from "../common/loader";

// navigation
import { useNavigate } from "react-router-dom";

// utils
import { handleDate, handleTime } from "../../utils/common/format";
import { registerEvent } from "../../utils/event/register";

// redux
import { useSelector } from "react-redux";

const Card = ({ event }) => {
    // global states
    const { userToken } = useSelector(state => state.user);

    // local states
    const [register, setRegister] = useState(event?.registered);

    // navigation
    const navigate = useNavigate();

    return (
        <div className="card">
            <div><Toaster /></div>
            <div className="img-container">
                {/* <img src={event.coverImage} alt="cover-img" className="cover-img" /> */}
                <img
                    loading="lazy"
                    className="cover-img"
                    src="https://images.unsplash.com/photo-1674574124345-02c525664b65?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="card-img"
                    onClick={() => {
                        console.log(event.id);
                        navigate(`/event/${event.id}`, { state: { event: event } });
                    }}
                />
            </div>
            <div className="card-content">
                <div className="uppercont">
                    <div className="title" onClick={() => {
                        console.log(event.id);
                        navigate(`/event/${event.id}`, { state: { event: event } });
                    }}>{event.name}</div>
                    <div className="available">{event.available}</div>
                </div>
                <div className="description">{event.description}</div>
                <div className="maincont">
                    <div className="leftcont">
                        <div className="date" style={event?.date ? { color: '#555' } : { color: 'var(--gray-600)' }}><i className="bi bi-calendar4-week icon"></i>{handleDate(event?.date, 0) || 'N/A'}</div>
                        <div className="time" style={event?.time ? { color: '#555' } : { color: 'var(--gray-600)' }}><i className="bi bi-clock icon"></i>{handleTime(event?.time) || 'N/A'}</div>
                        <div className="location" style={event?.venue ? { color: '#555' } : { color: 'var(--gray-600)' }}><i className="bi bi-pin-map icon"></i>{event?.venue || 'N/A'}</div>
                    </div>
                    <div className="divider"></div>
                    <div className="rightcont">
                        <div className="genre" style={{ textTransform: 'capitalize' }}>{['a', 'e', 'i', 'o', 'u'].includes(event?.genre[0]) ? 'An' : 'A'} {event?.genre} Event</div>
                        <div className="organiser-name">Organised by&nbsp;{event?.organiserCollege}</div>
                    </div>
                </div>
                <button
                    className="btn btn-fill btn-register d-flex align-items-center justify-content-center"
                    style={
                        register
                            ? { backgroundColor: 'rgba(0,0,0,0.5)', boxShadow: 'none' }
                            : { backgroundColor: 'var(--primary)' }
                    }
                    onClick={() => {
                        navigate(`/event/${event.id}`, { state: { event: event } });
                    }}
                >
                    {
                        register ? (
                            <i className="bi bi-calendar2-x-fill icon"></i>
                        ) : (
                            <i className="bi bi-calendar4-week icon"></i>
                        )
                    }
                    <span className="px-2">{register ? 'Already Registered' : 'Check Event'}</span>
                </button>
            </div>
        </div>
    )
};

export default Card;
