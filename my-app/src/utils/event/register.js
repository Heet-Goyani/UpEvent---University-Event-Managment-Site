import { API } from '../../apis';

export const registerEvent = async (eventID, userToken) => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.REGISTER_EVENT}/${eventID}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`,
            }
        })
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Error in bookmarking event:', err);
    }
}

let cnt = 0;
export const checkRegistration = async (eventID, userToken) => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.CHECK_REGISTERED}/${eventID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`,
            }
        })
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Error in checking Registration of Eveent:', err);
    }
};