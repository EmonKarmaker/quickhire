import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

// Jobs
export const getJobs = (params = {}) => api.get('/jobs', { params });
export const getJob = (id) => api.get(`/jobs/${id}`);
export const getCategories = () => api.get('/jobs/categories');
export const createJob = (data) => api.post('/jobs', data);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);

// Applications
export const submitApplication = (data) => api.post('/applications', data);
export const getApplications = (params = {}) => api.get('/applications', { params });

export default api;
