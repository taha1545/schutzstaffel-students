import api from './api';

// check server backend
export const checkServer = async () => {
    try {
        const response = await api.get('/contact');
        return response.data;
    } catch (error) {
        throw error;
    }
};