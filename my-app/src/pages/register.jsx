import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

// styles
import "../styles/auth/common.css";

// assets
import { images } from "../assets/images";
import { colleges } from "../data/colleges";

// utils
import { userRegister, ValidateRegisterData } from "../utils/auth/userRegister";

// navigation
import { useNavigate } from "react-router-dom";

// components
import Loader from "../components/common/loader";

// redux
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/slices/userSlice";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    const [name, setName] = useState('');
    const [selectedCollege, setSelectedCollege] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inProcess, setInProcess] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !inputRef.current.contains(event.target)) {
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

    const handleRegister = (e) => {
        e.preventDefault();
        (async () => {
            try {
                setInProcess(true);
                const { isValid, error } = ValidateRegisterData(name, selectedCollege, email, password);
                if (isValid === false) {
                    toast.error(error);
                    setInProcess(false);
                    return;
                }
                const response = await userRegister(name, selectedCollege, email, password);
                if (response && response.token) {
                    toast.success('Registered successful!');
                    dispatch(updateUser({ userToken: response.token, userData: response.user }))
                    setTimeout(() => {
                        navigate('/');
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
            <img loading="lazy" src={images.register_cover} alt="Cover Image" className="cover-img" />
            <div className="right-portion">
                <div className="title">Up<span className="p2">Event</span></div>
                <div className="heading">Create an Account</div>
                <form style={{ marginTop: '40px' }}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Enter your name" autoComplete="true" onChange={(e) => setName(e.target.value)} />
                    </div>
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
                                readOnly
                                onClick={toggleDropdown}
                                value={selectedCollege || ''}
                            />
                            <i className="bi bi-chevron-down dropdown-icon"></i>
                            {showDropdown && (
                                <div ref={dropdownRef} className="custom-dropdown">
                                    {colleges.map((college) => (
                                        <div
                                            className="dropdown-item"
                                            key={college.name}
                                            onClick={() => {
                                                setSelectedCollege(college.name);
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
                    <div className="form-group">
                        {
                            inProcess ? (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Loader width={'24px'} borderWidth={'2px'} />
                                </div>
                            ) : (
                                <button type="submit" className="btn btn-fill" onClick={handleRegister}>Register</button>
                            )
                        }
                    </div>
                </form>
                <div>Already have an account? <Link to={'/login'}>
                    <span className="p2" style={{ fontFamily: 'Bold', cursor: 'pointer' }}>Log in</span>
                </Link>
                </div>
            </div>
        </div>
    )
};

export default Register;