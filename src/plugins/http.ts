import Vue from 'vue';
import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { validateUrl } from './validator';

// import { store } from '../store/index';
export const axios = Axios.create({
});
axios.defaults.headers.common.Accept = 'application/json';

const client_secret = '86c146701c499f5854b4078da8efd90c1f1f84c8';
const client_id = '80984aed8beddbdcba77';
const BASE_URL_AUTH = 'https://github.com/login/oauth/access_token';

export class ApiHttp {
  private headers = {} as any;

  async get(url: string, params?: any) {
    const config = Object.assign({}, { headers: this.headers }, { params }) as AxiosRequestConfig;
    const targetUrl = validateUrl(url);
    return axios.get(targetUrl, config).then(response => {
      return response.data;
    });
  }

  async auth(code: string, state: string) {
    const item = {
      client_id,
      client_secret,
      code,
      state,
    };
    return axios.post('https://cors-anywhere.herokuapp.com/' + BASE_URL_AUTH + '/', item, { headers: this.headers }).then(response => {
      return response.data;
    });
  }
}

axios.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, error => {
  const error_code = error.response.status;
  const error_data = error.response.data;
  if (error_code) {
    switch (+error_code) {
      case 403: {
        console.log('response error:', error_code, error_data, 'Проверить https://cors-anywhere.herokuapp.com');
        break;
      }
      default:
        console.log('response error:', error_data, error_code);
    }
  }
  return Promise.reject(error);
});