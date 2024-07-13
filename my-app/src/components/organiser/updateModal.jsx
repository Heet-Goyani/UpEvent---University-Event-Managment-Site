import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';

const UpdateEvent = () => {
    const [state, setState] = React.useState({
        bottom: false,
    });

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, bottom: open });
    };

    return (
        <div>
            <Button size='small' className='btns' onClick={toggleDrawer(true)}>Update</Button>
            <SwipeableDrawer
                anchor="bottom"
                open={state.bottom}
                onClose={toggleDrawer(true)}
                onOpen={toggleDrawer(true)}
                style={{ zIndex: 1202 }}
            >
                <div role="presentation" style={{ }}>
                    <i className='bi bi-x' style={{ fontSize: '2rem' }} onClick={toggleDrawer(false)}></i>
                    {/* Add your content here */}
                    <h2>Update Event</h2>
                    <p>Event update form or details go here...</p>
                    <h1>Update Event</h1>
                </div>
            </SwipeableDrawer>
        </div>
    );
};

export default UpdateEvent;
