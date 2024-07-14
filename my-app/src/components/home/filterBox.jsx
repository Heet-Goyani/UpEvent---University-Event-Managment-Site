import React from 'react';
import '../../styles/home/home.css';

// styles

const FilterBox = () => {
    return (
        <div className='filterBox'>
            <div className='filter1'>
                <p className='p1'>Location</p>
                <input type='text' className='input' placeholder='Enter location' />
            </div>
            <div className='filter1'>
                <p className='p1'>Date</p>
                <input type='text' className='input' placeholder='Time' />
            </div>
            <div className='filter1'>
                <p className='p1'>Category</p>
                <select className='input'>
                    <option value='none'>None</option>
                    <option value='music'>Music</option>
                    <option value='food'>Food</option>
                    <option value='tech'>Tech</option>
                    <option value='sports'>Sports</option>
                </select>
            </div>
        </div>
    );
};

export default FilterBox;
