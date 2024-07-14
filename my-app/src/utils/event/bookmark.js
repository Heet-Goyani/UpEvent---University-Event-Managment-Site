import { API } from '../../apis';

export const eventBookmark = async(eventID, userToken) => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.BOOKMARK_EVENT}/${eventID}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`,
            }
        })
        const data = await response.json();
        return data;
    } catch(err) {
        console.log('Error in bookmarking event:', err);
    }
}

export const checkBookmark = async(eventID, userToken) => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.CHECK_BOOKMARK}/${eventID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`,
            }
        })
        const data = await response.json();
        return data;
    } catch(err) {
        console.log('Error in checking bookmark:', err);
    }
};

export const getAllBookmarks = async(userToken) => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.BOOKMARKED_EVENTS}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
        });
        const data = await response.json();
        return data;
    } catch(err){
        console.log('Error in getting all user bookmarks:', err);
    }
};