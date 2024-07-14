import { API } from "../../apis";

export const organiserLogin = async (email, password) => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.LOGIN_ORGANISER}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
