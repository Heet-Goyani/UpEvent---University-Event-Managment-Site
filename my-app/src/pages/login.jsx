import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

// styles
import "../styles/auth/common.css";

// assets
import { images } from "../assets/images";

// utils
import { userLogin, ValidateLoginData } from "../utils/auth/userLogin";
import { organiserLogin } from "../utils/auth/organiserLogin";

// navigation
import { useNavigate } from "react-router-dom";

// components
import Loader from "../components/common/loader";

// redux
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/slices/userSlice";
import { updateOrganiser } from "../redux/slices/organiserSlice";

const LogIn = ({ user }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [forgotPassword, setForgotPassword] = useState(false);
    const [inProcess, setInProcess] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleLogin = (e) => {
        e.preventDefault();
        (async () => {
            try {
                setInProcess(true);
                const {isValid, error} = ValidateLoginData(email, password);
                if(isValid === false) {
                    toast.error(error);
                    setInProcess(false);
                    return;
                }
                const response = user ? await userLogin(email, password) : await organiserLogin(email, password);
                if (response && response.token) {
                    toast.success('Login successful!');
                    if(user){
                        dispatch(updateUser({ userToken: response.token, userData: response.user }));
                        setTimeout(() => {
                            navigate('/');
                            window.location.reload();
                        }, 1000);
                    } else {
                        dispatch(updateOrganiser({ organiserToken: response.token, organiserData: response.organiser }));
                        setTimeout(() => {
                            navigate('/dashboard');
                            window.location.reload();
                        }, 1000);
                    }
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error('Login error! Try again later!');
                console.log('Login error:', error);
            } finally {
                setInProcess(false);
            }
        })();
    }

    const handleForgotPassword = (e) => {
        e.preventDefault();
        setEmail('');
        setForgotPassword(false);
    };

    return (
        <div className="container-fluid" id="signin">
            <div><Toaster /></div>
            <img loading="lazy" src={user ? images.signin_cover : images.signin_cover2} alt="Cover Image" className="cover-img" />
            <div className="right-portion">
                {
                    forgotPassword && (
                        <div className="back-btn" onClick={() => {
                            setEmail('');
                            setForgotPassword(false);
                        }}>
                            <i className="bi bi-chevron-left"></i><span>Back</span>
                        </div>
                    )
                }
                <div className="title" style={{ cursor: 'pointer' }} onClick={() => {
                    navigate('/');
                    window.location.reload();
                }}>Up<span className="p2">Event</span></div>
                <div className="heading">{forgotPassword ? 'Recover your Password' : user ? 'Log In to UpEvent' : 'Organiser Login Portal'}</div>
                {
                    forgotPassword && (
                        <div className="sub-heading">Enter the email that you used when register to recover your password. You will receive a password reset link.</div>
                    )
                }
                <form style={forgotPassword ? { marginTop: '20px' } : { marginTop: '40px' }}>
                    {
                        forgotPassword ?
                            (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={email}
                                            placeholder="Enter your email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-fill" onClick={handleForgotPassword}>Send Link</button>
                                    </div>
                                </>
                            )
                            :
                            (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={email}
                                            placeholder="Enter your email"
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <div>
                                            <label htmlFor="password">Password</label>
                                            <span className="forgot-pass" onClick={() => {
                                                setEmail('');
                                                setPassword('');
                                                setForgotPassword(true);
                                            }}>Forgot your password?</span>
                                        </div>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={password}
                                            placeholder="Enter your password"
                                            autoComplete="true"
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        {
                                            inProcess ? (
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Loader width={'24px'} borderWidth={'2px'} />
                                                </div>
                                            ) : (
                                                <button type="submit" className="btn btn-fill" onClick={handleLogin}>Log In</button>
                                            )
                                        }
                                    </div>
                                </>
                            )
                    }
                </form>
                <div>Don't you have an account? <Link to={user ? '/user-register' : '/organiser-register'}>
                    <span className="p2" style={{ fontFamily: 'Bold', cursor: 'pointer' }}>Register</span>
                </Link>
                </div>
            </div>
        </div>
    )
};

export default LogIn;
