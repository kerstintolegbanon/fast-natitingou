import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

// Crée une instance axios avec l'URL de base
const api = axios.create({
  baseURL: API_URL,
});

// Ajoute automatiquement le token JWT à chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Gère automatiquement les erreurs 401 (token expiré)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentification
export const authService = {
  login: (email, password) =>
    api.post('/auth/login/', { email, password }),
  getProfile: () =>
    api.get('/auth/profile/'),
};

// Étudiants
export const studentService = {
  getAll: () => api.get('/students/'),
  getOne: (id) => api.get(`/students/${id}/`),
  getFilieres: () => api.get('/students/filieres/'),
  getNiveaux: () => api.get('/students/niveaux/'),
};

// Notes
export const gradeService = {
  getMatieres: () => api.get('/grades/matieres/'),
  getNotes: () => api.get('/grades/notes/'),
  createNote: (data) => api.post('/grades/notes/', data),
  updateNote: (id, data) => api.put(`/grades/notes/${id}/`, data),
  validerNote: (id) => api.patch(`/grades/notes/${id}/valider/`),
};

// Emplois du temps
export const scheduleService = {
  getAll: () => api.get('/schedule/'),
};

export default api;