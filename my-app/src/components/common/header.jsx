import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import '../../styles/common/header.css';

// assets
import { images } from '../../assets/images';

// react-redux
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/slices/userSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userToken, userData } = useSelector(state => state.user);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleSignup = () => {
        navigate('/register');
    };

    useEffect(() => {
        if(userToken !== null && userData !== null) {
            setIsLoggedIn(true);
        }
        console.log(userToken, userData);
    }, []);
    
    return (
        <div className='cont' id='home-header'>
            <div className='home-heading'>
                <img src={images.logo} alt="logo" className='logo' />
                <p className='p1'>Up</p><p className='p2'>Event</p>
            </div>
            {
                isLoggedIn ? (
                    <div className="profile-section">
                        <a className="profile-link" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={userData.profilePic} className="profile" alt="Profile" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right profile-dropdown" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="#">
                                <i className="bi bi-person"></i> Profile
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="bi bi-bookmark"></i> Bookmarks
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/" onClick={() => {
                                dispatch(logOut());
                            }}>
                                <i className="bi bi-box-arrow-right"></i> Log Out
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className='btnBox'>
                        <button className='btn btn-outline' onClick={handleLogin}>Login</button>
                        <button className='btn btn-fill' onClick={handleSignup}>Register</button>
                    </div>
                )
            }
        </div>
    );
};

export default Header;
