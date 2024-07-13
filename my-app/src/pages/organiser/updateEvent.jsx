import * as React from 'react';
import Button from "@mui/material/Button";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import toast, { Toaster } from "react-hot-toast";

// component
import TextField from "../../components/organiser/textField";
import RadioGroup from "../../components/organiser/radioGroup";
import DateTimePickers from "../../components/organiser/dateTimePicker";
import InputFileUpload from "../../components/organiser/inputFileUpload";
import Dropdown from "../../components/organiser/dropdown";

// navigate
import { useLocation, useNavigate } from 'react-router-dom';

// utils
import { validateField } from "../../utils/common/validateField";
import { updateEvent } from '../../utils/organiser/updateEvent';

// redux
import { useSelector } from 'react-redux';

const UpdateEvent = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const event = location?.state?.event;
    const { organiserToken } = useSelector(state => state.organiser);

    const [eventStates, setEventStates] = React.useState({
        eventName: event?.name,
        date: null,
        time: null,
        venue: event?.venue,
        genre: event?.genre,
        available: event?.available,
        description: event?.description,
        coverImage: event?.coverImage,
        reachUsAt: event?.reachUsAt || "",
        meetLink: event?.meetLink || "",
        facebook: event?.facebook || "",
        instagram: event?.instagram || "",
        twitter: event?.twitter || "",
        linkedin: event?.linkedin || "",
    });
    const [updating, setUpdating] = React.useState(false);
    const [loadPage, setLoadPage] = React.useState(true);

    React.useEffect(() => {
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
            setUpdating(true);
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
            const response = await updateEvent(event?.id, organiserToken, eventStates);
            toast.success(response.message);
            navigate('/dashboard', { replace: true });
        } catch (error) {
            console.error(error);
            toast.error(error);
        } finally {
            setUpdating(false);
        }
    };

    return loadPage ? (
        <div className='d-flex justify-content-center align-items-center' style={{ width: '100%', height: '100%' }}>
            <CircularProgress style={{ color: 'var(--primary)' }} />
        </div>
    ) : (
        <>
            <div><Toaster /></div>
            <div id="createEvent" className="p-5 py-2">
                <div className="createEvent-heading" style={{ fontSize: '2rem' }}>Update Event</div>
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
                        disabled={updating}
                    >
                        Save Changes
                    </Button>
                </div>
                <Backdrop
                    sx={(theme) => ({ color: 'var(--primary)', zIndex: theme.zIndex.drawer + 1 })}
                    open={updating}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </>
    )
}

export default UpdateEvent;
