export const API = {
    'BASE_URL': import.meta.env.VITE_DEV_MODE,
    // user
    'REGISTER_USER': '/user/auth/register',
    'LOGIN_USER': '/user/auth/login',
    'USER_EVENTS': '/user/events',
    'GET_USER': '/user/profile',
    'UPDATE_USER': '/user/profile',
    // event
    'REGISTER_EVENT': '/user/registerevent/',
    'REGISTERED_EVENTS': '/user/registerevent',
    'CHECK_REGISTERED': '/user/registerevent/',
    'EVENTS': '/event/list',
    'BOOKMARK_EVENT': '/user/bookmarkevent/',
    'BOOKMARKED_EVENTS': '/user/bookmarkevent', 
    'CHECK_BOOKMARK': '/user/bookmarkevent/',
    // public apis
    'PUBLIC_EVENTS_LIST': '/public/events',
}
