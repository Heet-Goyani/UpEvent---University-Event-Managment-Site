import { API } from "../../apis";

export const deleteEvent = async (id, organiserToken) => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.DELETE_EVENT}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${organiserToken}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};