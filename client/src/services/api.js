import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (userData) => api.post('/auth/login', userData),
  getMe: () => api.get('/auth/me')
};

export const plantService = {
  getAllPlants: () => api.get('/plants'),
  getPlant: (id) => api.get(`/plants/${id}`),
  createPlant: (plantData) => api.post('/plants', plantData),
  updatePlant: (id, plantData) => api.put(`/plants/${id}`, plantData),
  deletePlant: (id) => api.delete(`/plants/${id}`),
  waterPlant: (id, notes) => api.post(`/plants/${id}/water`, { notes }),
  getWateringReminders: () => api.get('/plants/watering/reminders')
};

export const growthService = {
  getGrowthLogs: (plantId) => api.get(`/plants/${plantId}/growth`),
  createGrowthLog: (plantId, growthData) => api.post(`/plants/${plantId}/growth`, growthData)
};

export const dashboardService = {
  getStats: () => api.get('/dashboard/stats')
};

export const fertilizerService = {
  getLogs: (plantId) => api.get(`/fertilizer/plant/${plantId}`),
  createLog: (plantId, data) => api.post(`/fertilizer/plant/${plantId}`, data),
  deleteLog: (id) => api.delete(`/fertilizer/${id}`)
};

export const pestService = {
  getLogs: (plantId) => api.get(`/pest/plant/${plantId}`),
  createLog: (plantId, data) => api.post(`/pest/plant/${plantId}`, data),
  updateLog: (id, data) => api.put(`/pest/${id}`, data),
  deleteLog: (id) => api.delete(`/pest/${id}`)
};

export const galleryService = {
  getPhotos: (plantId) => api.get(`/gallery/plant/${plantId}`),
  addPhoto: (plantId, data) => api.post(`/gallery/plant/${plantId}`, data),
  deletePhoto: (id) => api.delete(`/gallery/${id}`)
};

export const taskService = {
  getTasks: () => api.get('/tasks'),
  createTask: (data) => api.post('/tasks', data),
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}`)
};

export const noteService = {
  getNotes: (plantId) => api.get(`/notes/plant/${plantId}`),
  createNote: (plantId, data) => api.post(`/notes/plant/${plantId}`, data),
  updateNote: (id, data) => api.put(`/notes/${id}`, data),
  deleteNote: (id) => api.delete(`/notes/${id}`)
};

export const roomService = {
  getRooms: () => api.get('/rooms'),
  createRoom: (data) => api.post('/rooms', data),
  getRoomWithPlants: (id) => api.get(`/rooms/${id}`),
  updateRoom: (id, data) => api.put(`/rooms/${id}`, data),
  deleteRoom: (id) => api.delete(`/rooms/${id}`)
};

export default api;
