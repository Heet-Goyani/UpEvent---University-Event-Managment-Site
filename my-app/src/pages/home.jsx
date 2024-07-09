import React, { useState, useEffect } from 'react';

// styles
import '../styles/home/home.css';

// assets
import { images } from '../assets/images';

// components
import Header from '../components/common/header';
import Banner from '../components/home/banner';
import Footer from '../components/common/footer';
import Card from '../components/common/card';
import Filter from '../components/common/filter';
import CollegeCard from '../components/home/collegeCard';
import Loader from '../components/common/loader';

// utils
import { getUserEvents } from '../utils/home/userEvents';
import { getPublicEvents } from '../utils/home/publicEvents';

// navigate
import { useNavigate } from 'react-router-dom';

// react-redux
import { useSelector } from 'react-redux';

const Home = () => {
    const [bgTop, setBgTop] = useState(images.bgTop);
    const [bgLeft, setBgLeft] = useState(images.bgLeft);
    const [events, setEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [visibleEvents, setVisibleEvents] = useState(3);
    const [visibleUpcomingEvents, setVisibleUpcomingEvents] = useState(3);
    const [loading, setloading] = useState(false);

    const navigate = useNavigate();

    const { userToken } = useSelector(state => state.user);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 480) {
                setBgTop(images.bgTop);
                setBgLeft(images.bgLeft);
            } else {
                setBgTop(images.bgTopSmall);
                setBgLeft(images.bgLeftSmall);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleUpcomingData = (events) => {
        const upcoming = events.filter(event => {
            // Dates
            const currentDate = new Date();
            const eventDate = new Date(event.date);

            // Time
            const currentTime = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
            const eventTime = event.time;

            if (eventDate > currentDate) return true;
            else if (currentDate === eventDate && eventTime > currentTime) return true;

            return false;
        });
        setUpcomingEvents(upcoming);
    };

    useEffect(() => {
        (async () => {
            try {
                setloading(true);
                let data = [];
                if (userToken) {
                    console.log('userToken access. Go for USER EVENTS API');
                    data = await getUserEvents(userToken);
                } else {
                    console.log('No userToken access. Go for PUBLIC EVENTS API');
                    data = await getPublicEvents();
                }
                setEvents(data?.events);
                handleUpcomingData(data?.events);
            } catch (error) {
                console.log('Error in fetching public events', error);
            } finally {
                setloading(false);
            }
        })();
    }, []);


    const loadMorePublicEvents = () => {
        setVisibleEvents(prev => Math.min(prev + 3, events.length));
    };

    const loadMoreUpcomingEvents = () => {
        setVisibleUpcomingEvents(prev => Math.min(prev + 3, events.length));
    }

    return (
        <>
            <div className='main'>
                {/* Backgrounds */}
                <img src={bgTop} alt="bg1" className='bgTop' />
                <img src={bgLeft} alt="bg2" className='bgLeft' />
                {/* section */}
                <section>
                    <Header />
                    <div className='content'>
                        <div className='heading'>An Event Hub</div>
                        <div className='sub-heading-1'>Experience a world of <span className='d-none d-sm-inline'>exciting</span> events with UpEvent.</div>
                        <p className='sub-heading-2'>Organizers post effortlessly, while users explore, register, and bookmark.</p>
                        <div className='emphasis-heading'>Join us and organise your college events!</div>
                        <div className='button-container'>
                            <button className='btn btn-fill' onClick={() => {
                                navigate('/organiser-register');
                                console.log('Organize Events');
                            }}>Organize Events</button>
                        </div>
                    </div>
                </section>

                {/* section */}
                <section id='upcoming'>
                    <div className='header'>
                        <div className='heading-p1'>Famous <span className='heading-p2'>Events</span></div>
                        <Filter />
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
                                        {events.slice(0, visibleEvents).map((event, index) => (
                                            <Card key={index} event={event} />
                                        ))}
                                        {visibleEvents < events.length && (
                                                <button className='btn btn-fill d-flex align-self-center align-items-center' style={{ marginTop: '10px' }} onClick={loadMorePublicEvents}>Load More...</button>
                                        )}
                                    </>
                                ) : (
                                    <div className='no-events'>No events available</div>
                                )}
                            </div>
                        )
                    }
                    <Banner />
                    <CollegeCard />
                    {
                        userToken && (
                            <>
                                <div className='header'>
                                    <div className='heading-p1'>Upcoming <span className='heading-p2'>Events</span></div>
                                    <button className='btn btn-fill btn-filter'>
                                        <img src={images.filter} alt="filter" className='filter-icon' />
                                        <span>Filter</span>
                                    </button>
                                </div>
                                {
                                    loading ? (
                                        <div className='loader-container'>
                                            <Loader width={'60px'} borderWidth={'6px'} color={'var(--primary)'} />
                                        </div>
                                    ) : (
                                        <div className='events-content'>
                                            {upcomingEvents?.length > 0 ? (
                                                <>
                                                    {upcomingEvents.slice(0, visibleUpcomingEvents).map((event, index) => (
                                                        <Card key={index} event={event} />
                                                    ))}
                                                    {visibleUpcomingEvents < upcomingEvents.length && (
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
                    }
                    <Footer />
                </section>
            </div>
        </>
    )
};

export default Home;
