export const API = {
    'BASE_URL': import.meta.env.VITE_DEV_MODE,
    
    // user
    'REGISTER_USER': '/user/auth/register',
    'LOGIN_USER': '/user/auth/login',
    'USER_EVENTS': '/user/events',
    'GET_USER': '/user/profile',
    'UPDATE_USER': '/user/profile',
    
    // organiser
    'REGISTER_ORGANISER': '/organiser/auth/register',
    'LOGIN_ORGANISER': '/organiser/auth/login',
    'GET_LOGGED_IN_ORGANISER': '/organiser',
    'UPDATE_ORGANISER': '/organiser',             // patch request
    'ORGANISER_EVENTS': '/organiser/events',
    'CREATE_EVENT': '/organiser/event/create',
    'DELETE_EVENT': '/organiser/event/delete',    // id is variable here, (delete request)
    'UPDATE_EVENT': '/organiser/event/update',    // id is variable here, (patch request)
    
    // event
    'EVENTS': '/event/list',
    'BOOKMARKED_EVENTS': '/user/bookmarkedevents', 
    'REGISTERED_EVENTS': '/user/registeredevents',
    'CHECK_BOOKMARK': '/user/isbookmarked',
    'CHECK_REGISTERED': '/user/isregistered',
    'REGISTER_EVENT': '/user/registerevent',
    'BOOKMARK_EVENT': '/user/bookmarkevent',

    // public apis
    'PUBLIC_EVENTS_LIST': '/public/events',      // GET req
    'GET_EVENTS_OF_ORGANISER': '/public/events', // POST req
}
