import axios from 'axios';
import { AuthResponse, Referral } from '../types';

const API_URL = 'https://workoai-2.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  },
};

export interface CreateReferralData {
  name: string;
  email: string;
  experience: number;
  resumeUrl: string;
}

export const referralService = {
  createReferral: async (data: CreateReferralData): Promise<Referral> => {
    const response = await api.post('/referrals', data);
    return response.data;
  },

  getReferrals: async (): Promise<Referral[]> => {
    const response = await api.get('/referrals');
    return response.data;
  },

  updateStatus: async (id: string, status: string): Promise<Referral> => {
    const response = await api.patch(`/referrals/${id}/status`, { status });
    return response.data;
  },

  uploadResume: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('resume', file);
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.fileUrl;
  },
};
