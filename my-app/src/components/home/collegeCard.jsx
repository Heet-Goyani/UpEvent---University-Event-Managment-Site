import React, { useState } from "react";

// styles
import '../../styles/home/collegeCard.scss';

// assets
import { images } from "../../assets/images";

// data
import { colleges } from '../../data/colleges';

// component
import Loader from '../common/loader';

const CollegeCard = () => {
    const [coverImages, setCoverImages] = React.useState([]);
    const [imageLoaded, setImageLoaded] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            try {
                setImageLoaded(false);
                const response = await fetch('https://picsum.photos/v2/list?page=1&limit=60', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const imageResponse = await response.json();
                if (imageResponse){
                    setCoverImages(imageResponse);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setTimeout(() => {
                    setImageLoaded(true);
                }, 1000);
            }
        })();
    },[])

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
                            {
                                setImageLoaded ? (
                                    <img className="img-cont" src={coverImages[index]?.download_url} alt={college.name} />
                                ) : (
                                    <div className="img-cont">
                                        <Loader width={'30px'} borderWidth={'3px'} />
                                    </div>
                                )
                            }
                            <div className="card-body">
                                <div className="sub-container">
                                    <div className="card-title">
                                        <i className="bi bi-mortarboard"></i>
                                        <div>{college.name}</div>
                                    </div>
                                    <div className="card-rating">
                                        <i className="bi bi-star-fill"></i>
                                        <div>{college.rating}</div>
                                    </div>
                                </div>
                                <div className="sub-container">
                                    <div className="card-text">
                                        <i className="bi bi-pin-map"></i>
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
