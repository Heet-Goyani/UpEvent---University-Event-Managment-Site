import { API } from '../../apis/index';

export const getUserEvents = async (userToken) => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.USER_EVENTS}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
