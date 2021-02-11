import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER
} from './types';

export function loginUser(body) {
    const request = axios.post('/api/users/login', body)
        .then(response => response.data);
    return {
        type: LOGIN_USER,
        payload: request
    };
};

export function registerUser(body) {
    const request = axios.post('/api/users/register', body)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    };
};