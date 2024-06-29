import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const getTodoTask = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/tasks?status=todo`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getOngoingTask = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/tasks?status=ongoing`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getCompletedTask = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/tasks?status=completed`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getCanceledTask = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/tasks?status=canceled`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const addTask = async (task) => {
    try {
        const response = await axios.post(`${BASE_URL}/tasks`, task);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}