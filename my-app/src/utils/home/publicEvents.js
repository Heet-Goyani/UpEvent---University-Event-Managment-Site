import { API } from '../../apis/index';

export const getPublicEvents = async () => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.PUBLIC_EVENTS_LIST}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
