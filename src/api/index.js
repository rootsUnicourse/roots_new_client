import axios from 'axios';

const API = axios.create({ baseURL: 'https://roots-server.onrender.com' });


export const fetchUsers = () => API.get('/user');
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const googleLogin = (googleData) => API.post('/user/googleLogin', googleData);
export const fetchCompanys = () => API.get('/companys')
export const createCompany = (newCompany) => API.post('/companys', newCompany);
export const fetchCompanysBySearch = (searchQuery) => API.get(`/companys/search?searchQuery=${searchQuery.search || 'none'}`)