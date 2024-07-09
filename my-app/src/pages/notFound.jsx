import React from 'react';

// assets
import { images } from '../assets/images';

// styles
import '../styles/common/notFound.scss';

// components
import Header from '../components/common/header';
import Footer from '../components/common/footer';

const notFound = () => {
    return (
        <div className='main notFound'>
            <Header />
            <div className='container'>
                <img src={images.notFound} alt="Not Found" />
            </div>
            <div className='text1'>Oops!</div>
            <div className='text2'>We can’t seem to find the page you are looking for</div>
            <div className='btn btn-fill back-btn px-3'>Back to Homepage</div>
            <Footer />
        </div>
    );
};

export default notFound;