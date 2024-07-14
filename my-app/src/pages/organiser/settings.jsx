import * as React from "react";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import toast, { Toaster } from "react-hot-toast";

// styles
import "../../styles/organiser/settings.scss";

// components
import TextField from "../../components/organiser/textField";

// utils
import { updateProfile, getNewOrganiserData } from "../../utils/organiser/updateOrganiser";

// redux
import { useSelector, useDispatch } from "react-redux";
import { updateOrganiser } from '../../redux/slices/organiserSlice';

const Settings = () => {
    const dispatch = useDispatch();

    const { organiserToken, organiserData } = useSelector(state => state.organiser);
    const [loadPage, setLoadPage] = React.useState(true);
    const [info, setInfo] = React.useState({
        name: organiserData?.name,
        email: organiserData?.email,
        about: organiserData?.about,
        website: organiserData?.website || '',
        location: organiserData?.location || '',
    });
    const [update, setUpdate] = React.useState(false);
    const [requestInProgress, setRequestInProgress] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    console.log(organiserToken, organiserData);
    const handleUpdate = async () => {
        if (update) {
            try {
                setRequestInProgress(true);
                const data = await updateProfile(organiserToken, info);

                const updatedData = await getNewOrganiserData(organiserToken);
                dispatch(updateOrganiser({
                    organiserToken: organiserToken,
                    organiserData: updatedData?.organiser,
                }));
                toast.success(data.message);
            } catch (error) {
                console.error(error);
                toast.error(error);
            } finally {
                setRequestInProgress(false);
                setUpdate(false);
            }
        } else {
            console.log('Update Profile');
            setUpdate(true);
        }
    };

    const handleValueChange = (field) => (value) => {
        setInfo((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleOpenDialog = () => {
        if (update) {
            setDialogOpen(true);
        } else {
            setUpdate(true);
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    React.useEffect(() => {
        setTimeout(() => {
            setLoadPage(false);
        }, 1000);
    }, []);

    return loadPage ? (
        <div className='d-flex justify-content-center align-items-center' style={{ width: '100%', height: '100%' }}>
            <CircularProgress style={{ color: 'var(--primary)' }} />
        </div>
    ) : (
        <>
            <div><Toaster /></div>
            <div id="settings">
                <div className="settings-header">
                    <div className="settings-title">Settings</div>
                    <div className="d-flex">
                        {
                            update && (
                                <Button
                                    variant="contained"
                                    className="update-btn mr-2"
                                    onClick={() => setUpdate(false)}
                                >
                                    Cancel
                                </Button>
                            )
                        }
                        <Button
                            variant="contained"
                            className="update-btn mr-2"
                            onClick={handleOpenDialog}
                        >
                            {
                                update ? 'Save Changes' : 'Update Profile'
                            }
                        </Button>
                    </div>
                </div>
                <div className="settings-content">
                    <TextField
                        label="College Name"
                        required
                        value={info.name}
                        disabled={true}
                    />
                    <TextField
                        label="Email"
                        required
                        value={info.email}
                        disabled={true}
                    />
                    <TextField
                        label="About"
                        multiline
                        value={info.about}
                        setValue={handleValueChange('about')}
                        disabled={!update}
                    />
                    <TextField
                        label="Website"
                        value={info.website}
                        setValue={handleValueChange('website')}
                        disabled={!update}
                    />
                    <TextField
                        label="Location"
                        value={info.location}
                        setValue={handleValueChange('location')}
                        disabled={!update}
                    />
                </div>
                <Dialog
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {'Are you sure you want to Save Changes?'}
                    </DialogTitle>
                    <DialogActions>
                        <Button className='dialog-btn' onClick={handleCloseDialog}>Cancel</Button>
                        <Button className='dialog-btn' onClick={() => {
                            handleUpdate();
                            handleCloseDialog();
                        }} autoFocus>
                            {'Save Changes'}
                        </Button>
                    </DialogActions>
                </Dialog>
                <Backdrop
                    sx={(theme) => ({ color: 'var(--primary)', zIndex: theme.zIndex.drawer + 1 })}
                    open={requestInProgress}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </>
    )
};

export default Settings;
