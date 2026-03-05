import api from './api';

// get users ranking 
export const ranking = async () => {
    try {
        const response = await api.get('/users/ranking');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get users ranking  weekly
export const rankingWeek = async () => {
    try {
        const response = await api.get('/users/most-active-week');
        return response.data;
    } catch (error) {
        throw error;
    }
};

//get all grades
export const grades = async () => {
    try {
        const response = await api.get('/grades');
        return response.data;
    } catch (error) {
        throw error;
    }
};

//get all goals 
export const goals = async () => {
    try {
        const response = await api.get('/goals');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get all user tasks
export const tasks = async (id) => {
    try {
        const response = await api.get(`/user-tasks/user/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get all user non completed tasks
export const activeTasks = async (id) => {
    try {
        const response = await api.get(`/user-tasks/user/${id}/active`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get user tasks deadline
export const tasksDeadline = async () => {
    try {
        const response = await api.get('/user-tasks/deadline');
        return response.data;
    } catch (error) {
        throw error;
    }
};


//get all badges 
export const badges = async () => {
    try {
        const response = await api.get('/badges');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get user badges
export const userBadges = async (id) => {
    try {
        const response = await api.get(`/user-badges/user/${id}`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
};

// get user dashborad data
export const dashboard = async () => {
    try {
        const response = await api.get('/student/dashboard');
        return response.data;
    }
    catch (error) {
        throw error;
    }
};

// update user task status(key , note)
export const updateUserTask = async (id, data, status = "Completed") => {
    try {
        const response = await api.put(`/user-tasks/${id}`, { ...data, status });
        return response.data;
    } catch (error) {
        throw error;
    }
};



