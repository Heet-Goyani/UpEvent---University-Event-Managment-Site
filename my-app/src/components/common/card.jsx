import React, { useState } from "react";

// styles
import '../../styles/common/card.scss';
import { images } from "../../assets/images";

const handleDate = (date) => {
    if (date === undefined || date === null) return null;
    const d = new Date(date);
    return d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

const handleTime = (timeString) => {
    if (timeString === undefined || timeString === null) return null;

    const time = new Date(`2022-01-01T${timeString}`);
    const formattedTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    return formattedTime;
};

const Card = ({ event }) => {
    const [clicked, setClicked] = useState(false);

    const handleRegister = (id) => {
        console.log(id);
        setTimeout(() => {
            setClicked(true);
        }, 800);
    }

    return (
        <div className="card">
            <div className="img-container">
                {/* <img src={event.coverImage} alt="cover-img" className="cover-img" /> */}
                <img loading="lazy" className="cover-img" src="https://images.unsplash.com/photo-1674574124345-02c525664b65?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="card-img" />
            </div>
            <div className="card-content">
                <div className="uppercont">
                    <div className="title">{event.name}</div>
                    <div className="available">{event.available}</div>
                </div>
                <div className="description">{event.description}</div>
                <div className="maincont">
                    <div className="leftcont">
                        <div className="date" style={event?.date ? { color: '#555' } : { color: 'var(--gray-600)' }}><img src={images.date} alt="date" className="icon" />{handleDate(event?.date) || 'N/A'}</div>
                        <div className="time" style={event?.time ? { color: '#555' } : { color: 'var(--gray-600)' }}><img src={images.time} alt="time" className="icon" />{handleTime(event?.time) || 'N/A'}</div>
                        <div className="location" style={event?.venue ? { color: '#555' } : { color: 'var(--gray-600)' }}><img src={images.location} alt="location" className="icon" />{event?.venue || 'N/A'}</div>
                    </div>
                    <div className="divider"></div>
                    <div className="rightcont">
                        <div className="genre" style={{ textTransform: 'capitalize' }}>{['a', 'e', 'i', 'o', 'u'].includes(event?.genre[0]) ? 'An' : 'A'} {event?.genre} Event</div>
                        <div className="organiser-name">Organised by&nbsp;{event?.organiser?.name}</div>
                    </div>
                </div>
                <button
                    className="btn btn-fill btn-register"
                    style={
                        clicked
                            ? { backgroundColor: 'rgba(0,0,0,0.5)', boxShadow: 'none', cursor: 'initial' }
                            : { backgroundColor: 'var(--primary)' }
                    }
                    onClick={() => {
                        handleRegister(event.id);
                    }}
                    disabled={clicked}
                >
                    <img
                        src={images.diagonalArrow}
                        alt="register"
                        className="arrow"
                        style={clicked ? { display: 'none' } : {}}
                    />
                    <span>{clicked ? 'Registered' : 'Register'}</span>
                </button>

            </div>
        </div>
    )
};

export default Card;
