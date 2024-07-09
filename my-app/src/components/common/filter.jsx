import React from "react";

// assets
import { images } from '../../assets/images';

// styles
import '../../styles/common/filter.scss';

const Filter = () => {
    return (
        <button className='btn btn-fill btn-filter'>
            <img src={images.filter} alt="filter" className='filter-icon' />
            <span>Filter</span>
        </button>
    )
}

export default Filter;