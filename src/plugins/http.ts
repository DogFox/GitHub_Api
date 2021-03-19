import Vue from 'vue';
import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
// import { store } from '../store/index';
export const axios = Axios.create({
});
axios.defaults.headers.common['Accept'] = 'application/json';

const secret = '86c146701c499f5854b4078da8efd90c1f1f84c8';
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
  
  async auth_post(code: string, state: string) {
    const item = {
      client_id: client_id,
      client_secret: secret,
      code: code,
      state: state,
    }
    return axios.post( 'https://cors-anywhere.herokuapp.com/' + BASE_URL_AUTH + '/', item, { headers: this.headers }).then(response => {
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