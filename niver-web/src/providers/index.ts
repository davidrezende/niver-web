import axios from 'axios';

// export const BaseApi = axios.create({ baseURL: 'http://localhost:8090' });
// export const PersonApi = axios.create({ baseURL: 'http://localhost:8090/person/api' });
// export const GroupApi = axios.create({ baseURL: 'http://localhost:8090/group/api' });
// export const MemberApi = axios.create({ baseURL: 'http://localhost:8090/member/api' });
// export const CalendarApi = axios.create({ baseURL: 'http://localhost:8090/calendar/api' });
// export const InviteApi = axios.create({ baseURL: 'http://localhost:8090/invite/api' });

export const BaseApi = axios.create({ baseURL: 'https://niverdequem.tk:8443' });
export const PersonApi = axios.create({ baseURL: 'https://niverdequem.tk:8443/person/api' });
export const GroupApi = axios.create({ baseURL: 'https://niverdequem.tk:8443/group/api' });
export const MemberApi = axios.create({ baseURL: 'https://niverdequem.tk:8443/member/api' });
export const CalendarApi = axios.create({ baseURL: 'https://niverdequem.tk:8443/calendar/api' });
export const InviteApi = axios.create({ baseURL: 'https://niverdequem.tk:8443/invite/api' });

CalendarApi.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // console.log(error.response)
  return Promise.reject(error);
});


PersonApi.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // console.log(error.response)
  return Promise.reject(error);
});

GroupApi.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // console.log(error.response)
  return Promise.reject(error);
});

MemberApi.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // console.log(error.response)
  return Promise.reject(error);
});
