import React, { useEffect, useState } from 'react';

// assets
import { images } from '../assets/images';

// styles
import '../styles/event/event.scss';

// common components
import Map from '../components/common/map';
import Loader from '../components/common/loader';

// components
import Header from '../components/common/header';
import EventBanner from '../components/event/banner';
import Card from '../components/common/card';
import Footer from '../components/common/footer';

// utils
import { getOrganiserEvents } from '../utils/common/organiserEvents';

// navigation
import { useLocation } from 'react-router-dom';

const Event = () => {
    // navigation
    const location = useLocation();
    const event = location?.state?.event;

    // console.log(event);
    // local states
    const [address, setAddress] = useState(event?.venue);
    const [loadingEvent, setLoadingEvent] = useState(true);
    const [organiserEvents, setOrganiserEvents] = useState([]);
    const [loadPage, setLoadPage] = useState(true);

    useEffect(() => {
        // scroll to top
        window.scrollTo(0, 0);
        setTimeout(() => {
            setLoadPage(false);
        }, 1000);
    }, [event]);

    useEffect(() => {
        (async () => {
            try {
                setLoadingEvent(true);
                const response = await getOrganiserEvents({ organiserCollege: event?.organiserCollege });

                if (response) {
                    const events = response?.events.filter(otherEvents => otherEvents?.id !== event?.id);
                    setOrganiserEvents(events);
                }
            } catch (error) {
                console.log('Error in fetching organiser\'s other events', error);
            } finally {
                setLoadingEvent(false);
            }
        })();
    }, [event?.organiserCollege]);

    console.log(organiserEvents);

    return loadPage ? (
        <div className='d-flex justify-content-center align-items-center' style={{ width: '100vw', height: '100vh' }}>
            <Loader width={'80px'} borderWidth={'8px'} color={'var(--primary)'} />
        </div>
    ) : (
        <div className='main' id='event'>
            <Header />
            <EventBanner
                eventID={event?.id}
                coverImage={event?.coverImage}
                name={event?.name}
                date={event?.date}
                time={event?.time}
                venue={event?.venue}
                description={event?.description}
                organiserCollege={event?.organiserCollege}
            />
            <div className='event-content'>
                <div className='event-left-cont'>
                    <div>
                        <div className='event-cont-heading'>Description</div>
                        <div className='event-cont-text py-2 pb-3'>{event?.description}</div>
                    </div>
                    <div className='adjacent-box'>
                        <div className='event-cont-heading'>Availablity:</div>
                        <div className='event-cont-text adjacent'>{event?.available}</div>
                    </div>
                    <div className='adjacent-box'>
                        <div className='event-cont-heading'>Genre:</div>
                        <div className='event-cont-text adjacent'>{event?.genre}</div>
                    </div>
                    <div className='adjacent-box'>
                        <div className='event-cont-heading'>Google meet link:</div>
                        <div className='event-cont-text adjacent'>{
                            event?.meetLink ? (
                                <a href={event?.meetLink} target='_blank' rel='noreferrer'>{event?.meetLink}</a>
                            ) : 'Not available'
                        }</div>
                    </div>
                    <div className='adjacent-box'>
                        <div className='event-cont-heading'>Registration link:</div>
                        <div className='event-cont-text adjacent'>{
                            event?.registerationLink ? (
                                <a href={event?.registerationLink} target='_blank' rel='noreferrer'>{event?.registerationLink}</a>
                            ) : 'Not available'
                        }</div>
                    </div>
                    {
                        (event?.instagram || event?.facebook || event?.linkedin || event?.twitter) && (
                            <div className='adjacent-box'>
                                <div className='event-cont-heading pr-2'>Reach us at:</div>
                                {event?.instagram && <a href={event?.instagram} target='_blank' rel='noreferrer'><img src={images.instagram} alt="instagram" className='social-icons' /></a>}
                                {event?.facebook && <a href={event?.facebook} target='_blank' rel='noreferrer'><img src={images.facebook} alt="facebook" className='social-icons' /></a>}
                                {event?.linkedin && <a href={event?.linkedin} target='_blank' rel='noreferrer'><img src={images.linkedin} alt="linkedin" className='social-icons' /></a>}
                                {event?.twitter && <a href={event?.twitter} target='_blank' rel='noreferrer'><img src={images.twitter} alt="twitter" className='social-icons' /></a>}
                            </div>
                        )
                    }
                </div>
                <div className='event-right-cont'>
                    <div>
                        <div className='event-cont-heading'>Event Location</div>
                        <div className='event-cont-text py-2 pb-3'>{event?.venue}</div>
                        <div className='event-cont-heading pb-2'>Check out on map</div>
                        <div className='map-box'>
                            <Loader width={'2rem'} borderWidth={'4px'} color={'var(--white)'} />
                            {/* for development purpose and cost management this is commented and replaced by a Loader */}
                            {/* <Map address={address} /> */}
                        </div>
                        <div className='pt-3'>
                            <div className='event-cont-heading pb-2'>Share with friends</div>
                            <div className='share-icons'>
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target='_blank' rel='noreferrer'>
                                    <img src={images.facebook} alt="facebook" className='social-icons m-0 mr-2' />
                                </a>
                                <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target='_blank' rel='noreferrer'>
                                    <img src={images.twitter} alt="twitter" className='social-icons m-0 mr-2' />
                                </a>
                                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target='_blank' rel='noreferrer'>
                                    <img src={images.linkedin} alt="linkedin" className='social-icons m-0 mr-2' />
                                </a>
                                {/* whatsapp */}
                                <a href={`https://api.whatsapp.com/send?text=${window.location.href}`} target='_blank' rel='noreferrer'>
                                    <img src={images.whatsapp} alt="whatsapp" className='social-icons m-0 mr-2' />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                organiserEvents?.length > 0 && <>
                    <div className='other-events px-2 px-md-3 px-lg-5'>
                        <div className='other-events-heading'>Other events you may like from <span style={{ color: 'var(--primary)' }}>{event?.organiserCollege}</span></div>

                        <div className='other-events-cont'>
                            {
                                organiserEvents?.map((event, index) => (
                                    <Card key={index} event={event} />
                                ))
                            }
                        </div>
                    </div>
                </>
            }
            <Footer />
        </div>
    )
};

export default Event;
