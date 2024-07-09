import React from 'react';

// styles
import '../styles/organiser/organiser.scss';

// components
import Header from '../components/common/header';
import Footer from '../components/common/footer';

const Organiser = () => {
    return (
        <>
            <div id='organiser'>
                <Header />
                <h1>Organiser</h1>
                <Footer />
            </div>
        </>
    );
}

export default Organiser;
