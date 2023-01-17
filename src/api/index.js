import axios from 'axios';

// const API = axios.create({ baseURL: 'https://roots-server.onrender.com' });
const API = axios.create({ baseURL: 'http://localhost:5001' });


export const fetchUsers = () => API.get('/user');
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const googleLogin = (googleData) => API.post('/user/googleLogin', googleData);
export const fetchCompanys = () => API.get('/companys')
export const createCompany = (newCompany) => API.post('/companys', newCompany);
export const fetchCompanysBySearch = (searchQuery) => API.get(`/companys/search?searchQuery=${searchQuery.search || 'none'}`)
export const checkBox = (isChecked) => API.post('/checkbox-clicked' ,isChecked);
export const sendMail = (mailData) => API.post('/mail', mailData);