import { API } from '../../apis';

export const userRegister = async (name, college, email, password) => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.REGISTER_USER}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, college, email, password }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const ValidateRegisterData = (name, college, email, password) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /.{6,}/;

    // empty test
    if (!name) {
        return { isValid: false, error: "Name is required" };
    }
    if (!college) {
        return { isValid: false, error: "College is required" };
    }
    if (!email) {
        return { isValid: false, error: "Email is required" };
    }
    if (!password) {
        return { isValid: false, error: "Password is required" };
    }
    // test
    if (!nameRegex.test(name)) {
        return { isValid: false, error: "Invalid name format" };
    }
    if (!emailRegex.test(email)) {
        return { isValid: false, error: "Invalid email format" };
    }
    if (!passwordRegex.test(password)) {
        return { isValid: false, error: "Password must be at least 6 characters long" };
    }
    return { isValid: true, error: null };
};