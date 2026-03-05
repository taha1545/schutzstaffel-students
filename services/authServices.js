import api from './api';

// fullName, email , grade , image ->(form data with file not json) : token  + data
export const signup = async (data) => {
    const response = await api.post('/auth/student/signup', data);
    return response.data;
};

//  uniqueCode -> (json) : token + data
export const login = async (data) => {
    try {
        const response = await api.post('/auth/student/login', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// redirect to google auth page
export const loginGoogle = async () => {
    try {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/google`;
    } catch (error) {
        throw error;
    }
};

// get user data from token
export const getUser = async () => {
    try {
        const response = await api.get('/users/me');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// update user data -> (json) 
export const updateUser = async (data) => {
    try {
        const response = await api.put('/users/me', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};