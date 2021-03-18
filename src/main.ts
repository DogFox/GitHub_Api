import Vue from 'vue';
import App from './App.vue';
import store from './store';
import { ApiHttp } from './plugins/http';

Vue.config.productionTip = false;

Vue.prototype.$http = ApiHttp;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
 