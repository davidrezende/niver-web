import axios from 'axios';

export const PersonApi = axios.create({ baseURL: 'http://localhost:8090/person/api' });
export const GroupApi = axios.create({ baseURL: 'http://localhost:8090/group/api' });
export const MemberApi = axios.create({ baseURL: 'http://localhost:8090/member/api' });