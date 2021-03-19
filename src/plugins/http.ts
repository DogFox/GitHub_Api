import Vue from 'vue';
import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
// import { store } from '../store/index';
export const axios = Axios.create({
});
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const secret = '13a5957c867ed290fb9633ee8b3179b9c5aa3981';
const client_id = '80984aed8beddbdcba77';
const BASE_URL = 'https://github.com/';
const BASE_URL_AUTH = 'https://github.com/login/oauth/access_token';

export class ApiHttp {
  private headers = {} as any;

  async get(url: string, params?: any) {
    const config = Object.assign({}, { headers: this.headers }, { params }) as AxiosRequestConfig;
    const targetUrl = BASE_URL + url;
    return axios.get(targetUrl, config).then(response => {
      return response.data;
    });
  }
  
  async auth_post(code: string) {
    const item = {
      client_id: client_id,
      clinet_secret: secret,
      code: code,
    }
    return axios.post( BASE_URL_AUTH + '/', item, { headers: this.headers }).then(response => {
      return response.data;
    });
  }
}
// Add a response interceptor
axios.interceptors.response.use((response: AxiosResponse) => {
   // Do something with response data
   // console.log(response.data);
 
  return response;
}, error => {
  const error_code = error.response.status;
  const error_data = error.response.data;
  // console.log('http_err', error_code);
  // console.log('http_err', error.response);

  if (error_code) {
    console.log('response error:', error_data, error_code);
    // Vue.prototype.$toast(error_data.error, { color: 'error' });
  }
  // Do something with response error
  return Promise.reject(error);
});