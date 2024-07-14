import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import toast, { Toaster } from "react-hot-toast";

// styles
import "../../styles/organiser/createEvent.scss";

// component
import TextField from "../../components/organiser/textField";
import RadioGroup from "../../components/organiser/radioGroup";
import DateTimePickers from "../../components/organiser/dateTimePicker";
import InputFileUpload from "../../components/organiser/inputFileUpload";
import Dropdown from "../../components/organiser/dropdown";

// utils
import { validateField } from "../../utils/common/validateField";
import { createEvent } from "../../utils/organiser/createEvent";

// redux
import { useSelector } from "react-redux";

const CreateEvent = () => {
    const { organiserToken } = useSelector((state) => state.organiser);
    const [eventStates, setEventStates] = React.useState({
        eventName: "",
        date: null,
        time: null,
        venue: "",
        genre: "Technical",
        available: "Online",
        description: "",
        coverImage: "",
        reachUsAt: "",
        meetLink: "",
        facebook: "",
        instagram: "",
        twitter: "",
        linkedin: "",
    });
    const [creating, setCreating] = React.useState(false);
    const [loadPage, setLoadPage] = React.useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoadPage(false);
        }, 500);
    }, []);

    const handleValueChange = (field) => (value) => {
        setEventStates((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleCreateEvent = async () => {
        try {
            setCreating(true);
            for (const key in eventStates) {
                if (eventStates.hasOwnProperty(key)) {
                    const value = eventStates[key];
                    const message = validateField(key, value);
                    if (message) {
                        toast.error(message);
                        return;
                    }
                }
            }
            console.log("Validation successful");
            const response = await createEvent(eventStates, organiserToken);
            toast.success(response.message);
            setEventStates({
                eventName: "",
                date: null,
                time: null,
                venue: "",
                genre: "Technical",
                available: "Online",
                description: "",
                coverImage: "",
                reachUsAt: "",
                meetLink: "",
                facebook: "",
                instagram: "",
                twitter: "",
                linkedin: "",
            });
        } catch (error) {
            console.error(error);
            toast.error(error);
        } finally {
            setCreating(false);
        }
    };

    return loadPage ? (
        <div className='d-flex justify-content-center align-items-center' style={{ width: '100%', height: '100%' }}>
            <CircularProgress style={{ color: 'var(--primary)' }} />
        </div>
    ) : (
        <>
            <div><Toaster /></div>
            <div id="createEvent" className="pb-3">
                <div className="createEvent-heading">Create Event</div>
                <div className="createEvent-content">
                    <div className="details-title">Event details</div>
                    <div className="createEvent-necessaryDetails">
                        <div className="details-row mt-2 pb-1">
                            <RadioGroup
                                value={eventStates.available}
                                setValue={handleValueChange('available')}
                            />
                        </div>
                        <div className="details-row mt-0 pt-0">
                            <TextField
                                label={'Event Name'}
                                value={eventStates.eventName}
                                setValue={handleValueChange('eventName')}
                                required={true}
                                multiline={false}
                            />
                            <Dropdown
                                value={eventStates.genre}
                                setValue={handleValueChange('genre')}
                            />
                        </div>
                        <DateTimePickers
                            dateValue={eventStates.date}
                            setDateValue={handleValueChange('date')}
                            timeValue={eventStates.time}
                            setTimeValue={handleValueChange('time')}
                            dateRequired={true}
                            timeRequired={true}
                        />
                        <div style={{ padding: '10px', marginLeft: '10px' }}>
                            <TextField
                                label={'Venue'}
                                value={eventStates.venue}
                                setValue={handleValueChange('venue')}
                                required={true}
                                multiline={false}
                            />
                        </div>
                        {/* Description */}
                        <div style={{ padding: '10px', marginLeft: '10px' }}>
                            <TextField
                                label={'Description'}
                                value={eventStates.description}
                                setValue={handleValueChange('description')}
                                required={true}
                                multiline={true}
                            />
                            <div style={{ fontSize: '0.75rem', marginTop: '5px', marginLeft: '10px', color: 'var(--gray-600)' }}>
                                <span style={{ fontFamily: 'Bold' }}>Note:&nbsp;</span>
                                <span style={{ fontFamily: 'Regular' }}>Description length should be more than 300 characters</span>
                            </div>
                        </div>
                        <InputFileUpload
                            value={eventStates.coverImage}
                            setValue={handleValueChange('coverImage')}
                        />
                    </div>
                    {/* Additional Info */}
                    <div className="details-title mt-3">Additional Information</div>
                    <div className="details-additionalInfo">
                        <div className="details-row">
                            <TextField
                                label={'Facebook Link'}
                                value={eventStates.facebook}
                                setValue={handleValueChange('facebook')}
                                required={false}
                                multiline={false}
                            />
                            <TextField
                                label={'Instagram Link'}
                                value={eventStates.instagram}
                                setValue={handleValueChange('instagram')}
                                required={false}
                                multiline={false}
                            />
                        </div>
                        <div className="details-row">
                            <TextField
                                label={'Twitter Link'}
                                value={eventStates.twitter}
                                setValue={handleValueChange('twitter')}
                                required={false}
                                multiline={false}
                            />
                            <TextField
                                label={'LinkedIn Link'}
                                value={eventStates.linkedin}
                                setValue={handleValueChange('linkedin')}
                                required={false}
                                multiline={false}
                            />
                        </div>
                        <div className="details-row">
                            <TextField
                                label={'Reach us at'}
                                value={eventStates.reachUsAt}
                                setValue={handleValueChange('reachUsAt')}
                                required={false}
                                multiline={false}
                            />
                            <TextField
                                label={'Meet Link'}
                                value={eventStates.meetLink}
                                setValue={handleValueChange('meetLink')}
                                required={false}
                                multiline={false}
                            />
                        </div>
                    </div>
                    <Button
                        variant="contained"
                        className="create-btn mr-2"
                        onClick={handleCreateEvent}
                        disabled={creating}
                    >
                        Creat Event
                    </Button>
                </div>
                <Backdrop
                    sx={(theme) => ({ color: 'var(--primary)', zIndex: theme.zIndex.drawer + 1 })}
                    open={creating}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </>
    )
};

export default CreateEvent;
