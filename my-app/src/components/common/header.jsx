import React, { useState } from 'react';

// styles
import '../../styles/common/header.css';

// assets
import { images } from '../../assets/images';

const Header = () => {
    const [isLoggedIn] = useState(false);

    const handleLogin = () => {
        window.location.href = '/login';
    };

    const handleSignup = () => {
        window.location.href = '/signup';
    };

    return (
        <div className='cont'>
            <div className='heading'>
                <img src={images.logo} alt="logo" className='logo' />
                <p className='p1'>Up</p><p className='p2'>Event</p>
            </div>
            {
                isLoggedIn ? (
                    <div className="profile-section">
                        <a className="profile-link" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src="https://lh3.googleusercontent.com/a/ACg8ocJeNOks3NynMczVETRtQorWS8-SWU4XxublttudK3Y1VOI=s432-c-no" className="profile" alt="Profile" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right profile-dropdown" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="#">
                                <i className="bi bi-person"></i> Profile
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="bi bi-bookmark"></i> Bookmarks
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                                <i className="bi bi-box-arrow-right"></i> Log Out
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className='btnBox'>
                        <button className='btn btn-outline' onClick={handleLogin}>Login</button>
                        <button className='btn btn-fill' onClick={handleSignup}>Signup</button>
                    </div>
                )
            }
        </div>
    );
};

export default Header;
