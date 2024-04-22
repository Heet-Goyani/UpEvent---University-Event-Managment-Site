import React from "react";

// styles
import '../../styles/home/collegeCard.scss';

// assets
import { images } from "../../assets/images";

// data
import { colleges } from '../../data/colleges';

const CollegeCard = () => {
    return (
        <>
            <div id="trending-college" className="header" style={{ justifyContent: 'flex-start' }}>
                <span className="p1">Trending</span>&nbsp;
                <span className="p2">Colleges</span>
            </div>
            <div className="card-group card-group-scroll">
                {
                    colleges.map((college, index) => (
                        <div className="card p-2" key={index}>
                            <img src={`https://www.iiitsurat.ac.in/assets/img/slider/8.jpg`} alt={college.name} />
                            <div className="card-body">
                                <div className="sub-container">
                                    <div className="card-title">
                                        <img src={images.college} alt="college" />
                                        <div>{college.name}</div>
                                    </div>
                                    <div className="card-rating">
                                        <i className="bi bi-star-fill"></i>
                                        <div>{college.rating}</div>
                                    </div>
                                </div>
                                <div className="sub-container">
                                    <div className="card-text">
                                        <img src={images.location} alt="location" />
                                        <div>{college.city}, {college.state}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
};

export default CollegeCard;
