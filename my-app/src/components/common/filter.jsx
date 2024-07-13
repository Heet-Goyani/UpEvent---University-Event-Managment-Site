import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// assets
import { images } from '../../assets/images';

// styles
import '../../styles/common/filter.scss';

const genreList = ["Technical", "Cultural", "Sports", "Educational", "Social", "Business", "Health and Wellness", "Charity", "Others"]

const Filter = ({ filterTypes, setFilterTypes }) => {
    console.log(filterTypes);
    const [startDate, setStartDate] = useState(filterTypes?.startDate);
    const [endDate, setEndDate] = useState(filterTypes?.endDate);
    const [isValid, setIsValid] = useState(true);
    const [selectedAvailability, setSelectedAvailablity] = useState(filterTypes?.availability);
    const [selectedGenres, setSelectedGenres] = useState(filterTypes?.genre);

    const handleApplyFilters = () => {
        if(isValid) {
            setFilterTypes({
                'availability': selectedAvailability,
                'genre': selectedGenres,
                'startDate': startDate,
                'endDate': endDate,
                'run': !filterTypes?.run,
            })
        }
    };

    const handleStartDateChange = (newValue) => {
        setStartDate(newValue);
        if (endDate && newValue >= endDate) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    };

    const handleEndDateChange = (newValue) => {
        setEndDate(newValue);
        if (startDate && newValue <= startDate) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    };

    const handleAvailabilityCheckboxChange = (availability) => (event) => {
        if (event.target.checked) {
            setSelectedAvailablity([...selectedAvailability, availability]);
        } else {
            setSelectedAvailablity(selectedAvailability.filter((a) => a !== availability));
        }
    };

    const handleGenreCheckboxChange = (genre) => (event) => {
        if (event.target.checked) {
            setSelectedGenres([...selectedGenres, genre]);
        } else {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        }
    };

    useEffect(() => {
        console.log(startDate, endDate);
        if ((!startDate && endDate) || (startDate && !endDate) || (startDate && endDate && startDate >= endDate)) {
            console.log('Invalid date range');
            setIsValid(false);
        } else {
            console.log('Filter applied');
            setIsValid(true);
        }
    },[startDate, endDate])

    return (
        <>
            <button type="button" className='btn btn-fill btn-filter' data-toggle="modal" data-target=".bd-example-modal-lg">
                {/* Adjust your icon and text as needed */}
                <img src={images.filter} alt="filter" className='filter-icon' />
                <span>Filter</span>
            </button>
            <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="myLargeModalLabel">Filter</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i className="bi bi-x" style={{ fontSize: '2rem' }}></i></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Availability division */}
                            <div className="content-heading pb-0">Availability</div>
                            <div className="select-checkbox">
                                {
                                    ["Online", "Offline"].map((availablity, index) => (
                                        <div className="checkbox" key={index}>
                                            <input type="checkbox" id={availablity} name={availablity} checked={selectedAvailability.includes(availablity)} onChange={handleAvailabilityCheckboxChange(availablity)} />
                                            <label htmlFor={availablity}>{availablity}</label>
                                        </div>
                                    ))
                                }
                            </div>
                            {/* Genre division */}
                            <div className="content-heading pb-0">Genre</div>
                            <div className="select-checkbox genre-select-box">
                                {
                                    genreList.map((genre, index) => (
                                        <div className="checkbox" key={index}>
                                            <input type="checkbox" id={genre} name={genre} checked={selectedGenres.includes(genre)} onChange={handleGenreCheckboxChange(genre)} />
                                            <label htmlFor={genre}>{genre}</label>
                                        </div>
                                    ))
                                }
                            </div>
                            {/* Date and Time division */}
                            <div className="content-heading">Set Date and Time</div>
                            <div className="pickers">
                                <div className="dateTimePicker">
                                    <DateTimePicker
                                        label="Start Date and Time"
                                        value={startDate}
                                        onChange={handleStartDateChange}
                                        slotProps={{
                                            textField: {
                                                color: isValid ? 'primary' : 'error',
                                                error: !isValid,
                                                sx: {
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: 'var(--primary)',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: isValid ? 'rgba(120, 72, 244, 0.7)' : 'rgba(211, 47, 47, 0.7)',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            border: 1.5,
                                                            borderColor: isValid ? 'rgba(120, 72, 244, 0.7)' : 'rgba(211, 47, 47, 0.9)',
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: isValid ? 'rgba(120, 72, 244, 0.7)' : 'rgba(211, 47, 47, 0.9)',
                                                        '&.Mui-focused': {
                                                            color: isValid ? 'rgba(120, 72, 244, 0.7)' : 'rgba(211, 47, 47, 1)',
                                                        },
                                                    },
                                                    '& .MuiSvgIcon-root': {
                                                        color: isValid ? 'rgba(120, 72, 244, 0.7)' : 'rgba(211, 47, 47, 0.9)',
                                                        '&.Mui-focused': {
                                                            outline: 'none',
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                        renderInput={(params) => <TextField style={{ userSelect: 'none' }} {...params} variant="outlined" />}
                                    />
                                </div>
                                <div className="dateTimePicker">
                                    <DateTimePicker
                                        label="End Date and Time"
                                        value={endDate}
                                        onChange={handleEndDateChange}
                                        slotProps={{
                                            textField: {
                                                color: isValid ? 'primary' : 'error',
                                                error: !isValid,
                                                sx: {
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: 'var(--primary)',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: isValid ? 'rgba(120, 72, 244, 0.7)' : 'rgba(211, 47, 47, 0.7)',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            border: 1.5,
                                                            borderColor: isValid ? 'rgba(120, 72, 244, 0.7)' : 'rgba(211, 47, 47, 0.8)',
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: isValid ? 'rgba(120, 72, 244, 0.7)' : 'rgba(211, 47, 47, 1)',
                                                        '&.Mui-focused': {
                                                            color: isValid ? 'rgba(120, 72, 244, 0.7)' : 'rgba(211, 47, 47, 1)',
                                                        },
                                                    },
                                                    '& .MuiSvgIcon-root': {
                                                        color: isValid ? 'rgba(120, 72, 244, 0.7)' : 'rgba(211, 47, 47, 0.9)',
                                                        '&.Mui-focused': {
                                                            outline: 'none',
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                        renderInput={(params) => <TextField style={{ userSelect: 'none' }} {...params} variant="outlined" />}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-clear-all" onClick={() => {
                                setStartDate(null);
                                setEndDate(null);
                                setIsValid(true);
                                setSelectedAvailablity([]);
                                setSelectedGenres([]);
                            }}>Clear All</button>
                            <button type="button" className="btn btn-fill" data-dismiss={isValid && "modal"} onClick={handleApplyFilters}>Apply Filters</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Filter;
