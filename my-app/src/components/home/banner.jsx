import React from "react";

// styles
import "../../styles/home/banner.scss";

// assets
import { images } from "../../assets/images";

// naviigation
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className="bannerContainer">
            <img src={images.bannerSvg} alt="banner-cover" />
            <div className="rightPortion">
                <p className="create-title">Make your own Events</p>
                <p className="create-desc">Manage and Showcase your events.<br />Lets's create one.</p>
                <button className="btn btn-fill btn-create" onClick={() => {
                    navigate("/organiser-login");
                }}>Create Events</button>
            </div>
        </div>
    )
};

export default Banner;
