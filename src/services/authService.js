import api from './api';

const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};

const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

const verifyEmail = async (token) => {
    const response = await api.get(`/auth/verify/${token}`);
    return response.data;
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

const authService = {
    login,
    register,
    verifyEmail,
    logout
};

export default authService;
