import React, { useState, useEffect, useRef } from 'react';

// styles
import '../styles/home/home.css';

// assets
import { images } from '../assets/images';

// components
import Header from '../components/common/header';
import Banner from '../components/home/banner';
import Footer from '../components/common/footer';
import CollegeCard from '../components/home/collegeCard';
import Loader from '../components/common/loader';
import FamousEventsList from '../components/home/famousEventsList';
import UpcomingEventsList from '../components/home/upcomingEventsList';

// utils
import { getUserEvents } from '../utils/home/userEvents';
import { getPublicEvents } from '../utils/home/publicEvents';

// navigate
import { useNavigate } from 'react-router-dom';

// react-redux
import { useSelector } from 'react-redux';

const Home = () => {
    // global states
    const { userToken } = useSelector(state => state.user);
    const { organiserToken } = useSelector(state => state.organiser);

    // navigate
    const navigate = useNavigate();

    // UI states
    const [bgTop, setBgTop] = useState(images.bgTop);
    const [bgLeft, setBgLeft] = useState(images.bgLeft);
    const [loadPage, setLoadPage] = useState(true);

    // famous events states
    const [events, setEvents] = useState([]);                               // public events
    const [loading, setLoading] = useState(false);                          // loading state for list 1

    // upcoming events states
    const [upcomingEvents, setUpcomingEvents] = useState([]);               // upcoming events
    const [loading2, setLoading2] = useState(false);                        // loading state for list 2

    useEffect(() => {
        if(organiserToken !== null) {
            navigate('/dashboard');
        }
    }, [organiserToken])

    // set background images based on screen size
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

    // function to filter public events into upcoming events
    const handleUpcomingData = (events) => {
        const upcoming = events.filter(event => {
            const currentDate = new Date();
            const eventDate = new Date(event.date);
            const currentTime = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
            const eventTime = event.time;

            if (eventDate > currentDate) return true;
            else if (currentDate === eventDate && eventTime > currentTime) return true;
            return false;
        });
        setUpcomingEvents(upcoming);
    };

    // fetch public events and upcoming events
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setLoading2(true);
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
                setLoading(false);
                setLoading2(false);
            }
        })();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoadPage(false);
        }, 1000);
    }, [events, upcomingEvents]);

    return loadPage ? (
        <div className='d-flex justify-content-center align-items-center' style={{ width: '100vw', height: '100vh' }}>
            <Loader width={'80px'} borderWidth={'8px'} color={'var(--primary)'} />
        </div>
    ) : (
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
                    <FamousEventsList loading={loading} setLoading={setLoading} events={events} />
                    <Banner />
                    <CollegeCard />
                    {
                        userToken && <UpcomingEventsList loading={loading2} setLoading={setLoading2} events={upcomingEvents} />
                    }
                    <Footer />
                </section>
            </div>
        </>
    )
};

export default Home;
