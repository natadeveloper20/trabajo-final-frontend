import api from './api';

const getTasksByProject = async (projectId) => {
    const response = await api.get(`/tasks/project/${projectId}`);
    return response.data;
};

const getTask = async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
};

const createTask = async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
};

const updateTask = async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
};

const deleteTask = async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
};

const taskService = {
    getTasksByProject,
    getTask,
    createTask,
    updateTask,
    deleteTask
};

export default taskService;
