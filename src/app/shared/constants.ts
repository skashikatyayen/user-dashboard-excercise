const BASE_URL = 'https://64a97aa08b9afaf4844abc0f.mockapi.io/api';
export const API_URLS = {
  login: '/auth',
  users: BASE_URL + '/users',
  user: BASE_URL + '/users/{userId}',
};

export const ROLES: {[key: string]: {name: string, value: string}} = {
  ROLE_ADMIN: { name: 'Admin', value: 'ROLE_ADMIN' },
  ROLE_USER: { name: 'User', value: 'ROLE_USER' },
};

export const ROLES_ARR = [ROLES['ROLE_ADMIN'], ROLES['ROLE_USER']];
