import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// components
import DrawerItem from '../../components/organiser/drawerItem';
import Loader from '../../components/common/loader';

// navigate
import { useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { logOut as logoutOrganiser } from '../../redux/slices/organiserSlice';

// pages
import MyEvents from './myEvents';
import CreateEvent from './createEvent';
import Settings from './settings';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

const Organiser = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { organiserToken } = useSelector(state => state.organiser);
    const [open, setOpen] = React.useState(false);
    const [activeComponent, setActiveComponent] = React.useState('MyEvents');
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [loadPage, setLoadPage] = React.useState(true);
    const [loadComponent, setLoadComponent] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleLogout = () => {
        console.log('clicked Logout');
        navigate('/organiser-login', { replace: true });
        dispatch(logoutOrganiser());
    }

    React.useEffect(() => {
        if (organiserToken === null) {
            setTimeout(() => {
                setLoadPage(false);
                navigate('/organiser-login', { replace: true });
            }, 1000);
        }
    }, [organiserToken]);

    React.useEffect(() => {
        setTimeout(() => {
            setLoadPage(false);
        }, 1000);
    }, []);

    const renderContent = () => {
        switch (activeComponent) {
            case 'MyEvents':
                return <MyEvents />;
            case 'CreateEvent':
                return <CreateEvent />;
            case 'Settings':
                return <Settings />;
            default:
                return <MyEvents />;
        }
    };

    return loadPage ? (
        <div className='d-flex justify-content-center align-items-center' style={{ width: '100vw', height: '100vh' }}>
            <Loader width={'80px'} borderWidth={'8px'} color={'var(--primary)'} />
        </div>
    ) : (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar style={{ backgroundColor: 'var(--primary)' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={[{ marginRight: 5 }, open && { display: 'none' }]}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5" noWrap component="div" className='d-flex' style={{ fontFamily: 'Bold', fontSize: '1.75rem' }}>
                            <p className=''>Up</p><p className=''>Event</p>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        <DrawerItem name={'My Events'} icon={'bi-calendar-week-fill'} handleClick={() => {
                            setActiveComponent('MyEvents');
                            console.log('clicked My Events');
                        }} />
                        <DrawerItem name={'Create Event'} icon={'bi-calendar-plus-fill'} handleClick={() => {
                            setActiveComponent('CreateEvent');
                            console.log('clicked Create Event');
                        }} />
                        <DrawerItem name={'Settings'} icon={'bi-gear-fill'} handleClick={() => {
                            setActiveComponent('Settings');
                            console.log('clicked Settings');
                        }} />
                    </List>
                    <Divider />
                    <DrawerItem name={'Logout'} icon={'logout'} handleClick={handleOpenDialog} />
                    <Dialog
                        open={dialogOpen}
                        onClose={handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {'Are you sure you want to logout?'}
                        </DialogTitle>
                        <DialogActions>
                            <Button className='dialog-btn' onClick={handleCloseDialog}>Cancel</Button>
                            <Button className='dialog-btn' onClick={() => {
                                handleLogout();
                                handleCloseDialog();
                            }} autoFocus>
                                {'Logout'}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3, pl: 4 }} style={{ height: '100vh' }}>
                    <DrawerHeader />
                    {renderContent()}
                </Box>
            </Box>
        </>
    );
}

export default Organiser;
