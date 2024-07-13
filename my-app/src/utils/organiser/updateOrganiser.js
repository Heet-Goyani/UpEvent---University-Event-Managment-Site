import { API } from "../../apis";

export const updateProfile = async (organiserToken, info) => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.UPDATE_ORGANISER}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${organiserToken}`
            },
            body: JSON.stringify({
                name: info.name,
                email: info.email,
                about: info.about,
                website: info.website.length > 0 ? info.website : null,
                location: info.location.length > 0 ? info.location : null,
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};


export const getNewOrganiserData = async (organiserToken) => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.GET_LOGGED_IN_ORGANISER}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${organiserToken}`
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};