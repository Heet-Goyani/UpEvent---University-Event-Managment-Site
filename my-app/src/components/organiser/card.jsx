import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';

// styles
import "../../styles/organiser/card.css";

// components
import UpdateModal from './updateModal';
import AlertDialog from './alertDialog';

// utils
import { handleDate, handleTime } from '../../utils/common/format';
import { deleteEvent } from '../../utils/organiser/deleteEvent';

// redux
import { useSelector } from 'react-redux';

export default function OrganiserCard({ item, setEventsChanged }) {
    const { organiserToken } = useSelector(state => state.organiser);

    const handleEventDeletion = async (id) => {
        try {
            const response = await deleteEvent(id, organiserToken);
            console.log(response);
            toast.success(response?.message);
            setEventsChanged((prev) => prev + 1);
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again.');
        }
    };

    console.log(item);
    return (
        <>
            <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className='organiser-card'>
                <div>
                    <CardMedia
                        sx={{ height: 150 }}
                        image={item?.coverImage}
                    />
                    <CardContent className='pb-0'>
                        <Typography gutterBottom variant="h5" component="div">
                            {item?.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            <span style={{ fontFamily: 'Bold' }}>Date:</span>&nbsp;&nbsp;{handleDate(item?.date, 0)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            <span style={{ fontFamily: 'Bold' }}>Time:</span>&nbsp;&nbsp;{handleTime(item?.time)}
                        </Typography>
                        <Typography variant="body2" className='truncate' sx={{ color: 'text.secondary' }}>
                            <span style={{ fontFamily: 'Bold' }}>Venue:</span>&nbsp;&nbsp;{item?.venue}
                        </Typography>
                    </CardContent>
                </div>
                <CardActions>
                    <UpdateModal item={item} />
                    <AlertDialog
                        title={'Are you sure you want to delete this event?'}
                        content={'This action cannot be undone.'}
                        action={'Delete'}
                        handleAction={() => {
                            console.log('Delete the event');
                            handleEventDeletion(item?.id);
                        }} />
                </CardActions>
            </Card>
        </>
    );
}
