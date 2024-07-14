import { API } from '../../apis/index';

export const getOrganiserEvents = async ({ organiserCollege }) => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.GET_EVENTS_OF_ORGANISER}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: organiserCollege,
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
