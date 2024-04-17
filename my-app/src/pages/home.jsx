import React, { useState, useEffect } from 'react';

// styles
import '../styles/home/home.css';

// assets
import { images } from '../assets/images';

// components
import Header from '../components/common/header';

const Home = () => {
    const [bgTop, setBgTop] = useState(images.bgTop);
    const [bgLeft, setBgLeft] = useState(images.bgLeft);

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

        // Initial setup
        handleResize();

        // Event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return (
        <>
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
                            console.log('Organize Events');
                        }}>Organize Events</button>
                    </div>
                </div>
            </section>

            {/* section */}
            <section id='upcoming'>
                <div className='header'>
                    <div className='heading-p1'>Famous <span className='heading-p2'>Events</span></div>
                    <button className='btn btn-fill btn-filter'>
                        <img src={images.filter} alt="filter" className='filter-icon' />
                        <span>Filter</span>
                    </button>
                </div>
            </section>
        </>
    )
};

export default Home;
