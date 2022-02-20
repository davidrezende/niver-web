import axios from 'axios';




export const BaseApi = axios.create({ baseURL: 'http://localhost:8090' });
export const PersonApi = axios.create({ baseURL: 'http://localhost:8090/person/api' });
export const GroupApi = axios.create({ baseURL: 'http://localhost:8090/group/api' });
export const MemberApi = axios.create({ baseURL: 'http://localhost:8090/member/api' });

PersonApi.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  console.log('interceptor token:', token)
  if (token && config.headers) {
    config.headers.Authorization = token;
  }
  return config
});

PersonApi.interceptors.response.use(function (response) {
  if(response.status === 401){
    localStorage.clear()
  }
  const token = localStorage.getItem('token');
  console.log('interceptor response token:', token)

  return response;
}, function (error) {
  if(error.response.status === 401){
    localStorage.clear()
  }
  const token = localStorage.getItem('token');
  console.log('interceptor response token:', token)

  return Promise.reject(error);
});

GroupApi.interceptors.response.use(function (response) {
  if(response.status === 401){
    localStorage.clear()
  }
  const token = localStorage.getItem('token');
  console.log('interceptor response token:', token)

  return response;
}, function (error) {
  if(error.status === 401){
    localStorage.clear()
  }
  const token = localStorage.getItem('token');
  console.log('interceptor response token:', token)

  return Promise.reject(error);
});

MemberApi.interceptors.response.use(function (response) {
  if(response.status === 401){
    localStorage.clear()
  }
  const token = localStorage.getItem('token');
  console.log('interceptor response token:', token)

  return response;
}, function (error) {
  if(error.status === 401){
    localStorage.clear()
  }
  const token = localStorage.getItem('token');
  console.log('interceptor response token:', token)
  return Promise.reject(error);
});

GroupApi.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  console.log('interceptor token:', token)
  if (token && config.headers) {
    config.headers.Authorization = token;
  }
  return config
});

MemberApi.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  console.log('interceptor token:', token)
  if (token && config.headers) {
    config.headers.Authorization = token;
  }
  return config
});