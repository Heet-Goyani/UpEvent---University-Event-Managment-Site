import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

// styles
import "../styles/auth/common.css";

// assets
import { images } from "../assets/images";
import { colleges } from "../data/colleges";

// utils
import { userRegister, ValidateRegisterData as ValidateUserRegisterData } from "../utils/auth/userRegister";
import { organiserRegister, ValidateRegisterData as ValidateOrganiserRegisterData } from "../utils/auth/organiserRegister";

// navigation
import { useNavigate } from "react-router-dom";

// components
import Loader from "../components/common/loader";

// redux
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/slices/userSlice";
import { updateOrganiser } from "../redux/slices/organiserSlice";

const Register = ({ user }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    const [name, setName] = useState('');
    const [selectedCollege, setSelectedCollege] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [about, setAbout] = useState('');
    const [inProcess, setInProcess] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !inputRef.current.contains(event.target)) {
                setFilterText('');
                console.log('click outside: ', filterText, selectedCollege);
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const filteredColleges = colleges.filter(college =>
        college.name.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleUserRegister = (e) => {
        e.preventDefault();
        (async () => {
            try {
                setInProcess(true);
                const { isValid, error } = ValidateUserRegisterData(name, selectedCollege, email, password);
                if (isValid === false) {
                    toast.error(error);
                    setInProcess(false);
                    return;
                }
                
                const response = await userRegister(name, selectedCollege, email, password);
                
                if (response && response.token) {
                    // successful registration -> show toast and update redux
                    toast.success('Registered successful!');
                    dispatch(updateUser({ userToken: response.token, userData: response.user }));

                    // navigation to home
                    setTimeout(() => {
                        navigate('/');
                        window.location.reload();
                    }, 1000);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error('Registration error! Try again later!');
            } finally {
                setInProcess(false);
            }
        })();
    }

    const handleOrganiserRegister = (e) => {
        e.preventDefault();
        (async () => {
            try {
                setInProcess(true);
                const { isValid, error } = ValidateOrganiserRegisterData(selectedCollege, email, password, about);
                if (isValid === false) {
                    toast.error(error);
                    setInProcess(false);
                    return;
                }

                const response = await organiserRegister(selectedCollege, email, password, about);

                if (response && response.token) {
                    // successful registration -> show toast and update redux
                    toast.success('Registered successful!');
                    dispatch(updateOrganiser({ userToken: response.token, userData: response.user }));

                    // navigation to dashboard
                    setTimeout(() => {
                        navigate('/dashboard');
                        window.location.reload();
                    }, 1000);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error('Registration error! Try again later!');
            } finally {
                setInProcess(false);
            }
        })();
    }

    return (
        <div className="container-fluid" id="register">
            <div><Toaster /></div>
            <img loading="lazy" src={user ? images.register_cover : images.register_cover2} alt="Cover Image" className="cover-img" />
            <div className="right-portion">
                <div className="title" style={{ cursor: 'pointer' }} onClick={() => {
                    navigate('/');
                    window.location.reload();
                }}>Up<span className="p2">Event</span></div>
                <div className="heading">{user ? 'Create an Account' : 'Organiser Register Portal'}</div>
                <form style={{ marginTop: '40px' }}>
                    {
                        user && (
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" placeholder="Enter your name" autoComplete="true" onChange={(e) => setName(e.target.value)} />
                            </div>
                        )
                    }
                    <div className="form-group">
                        <label htmlFor="college">College</label>
                        <div className="input-container">
                            <input
                                ref={inputRef}
                                style={selectedCollege ? { color: 'var(--black)' } : { color: 'var(--grey-600)' }}
                                type="text"
                                id="college"
                                name="college"
                                placeholder="Choose your college"
                                // readOnly
                                onClick={toggleDropdown}
                                onChange={(e) => {
                                    setFilterText(e.target.value);
                                    setShowDropdown(true);
                                }}
                                value={filterText}
                                autoComplete="false"
                            />
                            <i className="bi bi-chevron-down dropdown-icon"></i>
                            {showDropdown && (
                                <div ref={dropdownRef} className="custom-dropdown">
                                    {filteredColleges.sort((a, b) => a.name.localeCompare(b.name)).map((college, index) => (
                                        <div
                                            className="dropdown-item"
                                            key={index}
                                            onClick={() => {
                                                setSelectedCollege(college.name);
                                                setFilterText(college.name);
                                                setShowDropdown(false);
                                            }}
                                        >
                                            {college.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" autoComplete="true" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" autoComplete="true" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {
                        !user && (
                            <div className="form-group">
                                <label htmlFor="about">About College</label>
                                <textarea
                                    type="text"
                                    id="about"
                                    name="about"
                                    placeholder="Write about your college"
                                    onChange={(e) => setAbout(e.target.value)}
                                    style={{ maxHeight: '5em', minHeight: '5em' }} 
                                />
                            </div>
                        )
                    }
                    <div className="form-group">
                        {
                            inProcess ? (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Loader width={'24px'} borderWidth={'2px'} />
                                </div>
                            ) : (
                                <button type="submit" className="btn btn-fill" onClick={user ? handleUserRegister : handleOrganiserRegister}>Register</button>
                            )
                        }
                    </div>
                </form>
                <div>Already have an account? <Link to={user ? '/user-login' : '/organiser-login'}>
                    <span className="p2" style={{ fontFamily: 'Bold', cursor: 'pointer' }}>Log in</span>
                </Link>
                </div>
            </div>
        </div>
    )
};

export default Register;