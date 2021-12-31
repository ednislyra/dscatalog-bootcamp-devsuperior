import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

type LoginResponse = {
  access_token: String;
  token_type: String;
  expires_in: number;
  scope: String;
  userFirstName: String;
  userId: number;
};

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

const tokenKey = 'authData';

//CONSTANTE PARA BUSCAR AS VARIÁVEIS DE AMBIENTE
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123';

type LoginData = {
  username: string;
  password: string;
};

//FAZER LOGIN(REQUISIÇÃO DE FORMA MAIS LIMPA)
export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: 'password',
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    data,
    headers,
  });
};

//REQUISIÇÃO PARA INDICAR SE O USUÁRIO ESTA AUTORIZADO OU NÃO A FAZER A REQUISIÃO
export const requestBackend = (config: AxiosRequestConfig) => {

  const headers = config.withCredentials ? {
    ...config.headers,
    Authorization: "Bearer" + getAuthData().access_token
  } : config.headers;
    

  return axios({...config, baseURL: BASE_URL, headers});
};

//SALVAR DADOS NO LOCALSTORAGE
export const saveAuthData = (obj: LoginResponse) => {
  localStorage.setItem(tokenKey, JSON.stringify(obj));
};

export const getAuthData = () => {
  const str = localStorage.getItem(tokenKey) ?? '{}';
  return JSON.parse(str) as LoginResponse;
};
