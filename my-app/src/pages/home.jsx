import React, { useState } from 'react';
import { BsFilter } from 'react-icons/bs';

// styles
import '../styles/home/home.css';

// components
import Header from '../components/common/header';
import Banner from '../components/home/banner';
// import FilterBox from '../components/home/filterBox';

const Home = () => {
    return (
        <>
            <div className='headerBox'>
                <Header />
            </div>
            <Banner />
            <div className='heading2 d-flex flex-row justify-content-between align-items-center'>
                <div><span>Upcoming</span>&nbsp;<span>Events</span></div>
                <div>
                    <button className="btn d-flex flex-row justify-content-around align-items-center filterBtn">
                        <span style={{ paddingRight: '5px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                                <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                            </svg>
                        </span>
                        <span className='filterTxt'>Filter</span>
                    </button>
                </div>
            </div>
        </>
    )
};

export default Home;
