import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import { useNavigate } from 'react-router-dom';

// styles
import '../../styles/common/header.css';

// assets
import { images } from '../../assets/images';

// react-redux
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/slices/userSlice';
import { logOut as logoutOrganiser } from '../../redux/slices/organiserSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { userToken, userData } = useSelector(state => state.user);
    const { organiserToken, organiserData } = useSelector(state => state.organiser);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAction = () => {
        dispatch(logOut());
        navigate('/user-login');
    };

    const handleLogin = () => {
        navigate('/user-login');
    };

    const handleSignup = () => {
        navigate('/user-register');
    };

    useEffect(() => {
        if (userToken !== null && userData !== null) {
            console.log('User is logged in');
            dispatch(logoutOrganiser());
            setIsLoggedIn(true);
        } else if (organiserToken !== null && organiserData !== null) {
            console.log('Organiser is logged in');
            dispatch(logOut());
            setIsLoggedIn(true);
        }
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
                            <img src={images.defaultProfile} className="profile" alt="Profile" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right profile-dropdown" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="/">
                                <i className="bi bi-person"></i> Profile
                            </a>
                            <a className="dropdown-item" href="/bookmarks">
                                <i className="bi bi-bookmarks"></i> Bookmarks
                            </a>

                            <a className="dropdown-item" href="/registered-events">
                                <i className="bi bi-calendar4-event"></i> Events
                            </a>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item" href="/" onClick={handleClickOpen}>
                                <i className="bi bi-box-arrow-right"></i>Log Out
                            </div>
                        </div>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                'Are you sure you want to log out?'
                            </DialogTitle>
                            <DialogActions>
                                <Button className='dialog-btn' onClick={handleClose}>Cancel</Button>
                                <Button className='dialog-btn' onClick={() => {
                                    handleAction();
                                    handleClose();
                                }}>
                                    Log Out
                                </Button>
                            </DialogActions>
                        </Dialog>
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
