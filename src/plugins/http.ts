import Vue from 'vue';
import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
// import { store } from '../store/index';
export const axios = Axios.create({
});

const BASE_URL = 'https://api.github.com';

export class ApiHttp {
  private headers = {} as any;

  async get(url: string, params?: any) {
   const config = Object.assign({}, { headers: this.headers }, { params }) as AxiosRequestConfig;
   const targetUrl = BASE_URL + url;
   return axios.get(targetUrl, config).then(response => {
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