import { API } from "../../apis";

export const userLogin = async (email, password) => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.LOGIN_USER}`, {
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

export const ValidateLoginData = (email, password) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
    const passwordRegex = /.{6,}/;

    // empty test
    if (!email) {
        return { isValid: false, error: "Email is required" };
    }
    if (!password) {
        return { isValid: false, error: "Password is required" };
    }
    // test
    if(!emailRegex.test(email)) {
        return { isValid: false, error: "Invalid email format" };
    }
    if (!passwordRegex.test(password)) {
        return { isValid: false, error: "Password must be at least 6 characters long" };
    }
    return { isValid: true, error: null };
}