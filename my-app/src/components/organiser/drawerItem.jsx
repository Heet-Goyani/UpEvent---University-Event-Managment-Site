import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';

const DrawerItem = ({ name, icon, handleClick }) => {
    return (
        <ListItem key={name} disablePadding sx={{ display: 'block' }}>
            <ListItemButton sx={[{ minHeight: 48, px: 2.5 }, open ? { justifyContent: 'initial' } : { justifyContent: 'center' }]}
                onClick={handleClick}
            >
                <ListItemIcon sx={[{ minWidth: 0, justifyContent: 'center' }, open ? { mr: 3 } : { mr: 'auto' }]}>
                    {
                        icon === 'logout' ? (
                            <LogoutIcon style={{ fontSize: '1.5rem', color: 'var(--primary-700)' }} />
                        ) : (
                            <i className={`bi ${icon}`} style={{ fontSize: '1.25rem', color: 'var(--primary-700)' }}></i>
                        )
                    }
                </ListItemIcon>
                <ListItemText
                    style={{ fontFamily: 'Regular', fontSize: '1rem', color: 'var(--primary-700)'}}
                    primary={name}
                    sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                />
            </ListItemButton>
        </ListItem>
    )
};

export default DrawerItem;