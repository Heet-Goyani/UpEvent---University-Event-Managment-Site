import React from "react";

// styles
import "../../styles/home/banner.scss";

// assets
import { images } from "../../assets/images";

const Banner = () => {
    return (
        <div className="bannerContainer">
            <img src={images.bannerSvg} alt="banner-cover" />
            <div className="rightPortion">
                <p className="create-title">Make your own Events</p>
                <p className="create-desc">Manage and Showcase your events.<br />Lets's create one.</p>
                <button className="btn btn-fill btn-create">Create Events</button>
            </div>
        </div>
    )
};

export default Banner;
