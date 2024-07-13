import { API } from "../../apis";

export const updateEvent = async({ id, organiserToken }) => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.UPDATE_EVENT}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${organiserToken}`
            }
        });

        const data = await response.json();
        return data;
    } catch(error) {
        console.log('Error in updating Event: ', error);
    }
};
