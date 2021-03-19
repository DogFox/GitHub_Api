import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export interface SystemState {
  sessionToken: string | undefined; // текущий токен
}

const state: SystemState = {
  sessionToken: '',
};

export default new Vuex.Store({
  state,
  getters:{
      // текущий токен
    getToken: (state: SystemState) => () => {
      return state.sessionToken;
    },
    // аутентифицирован ли пользователь
    isAuth: (state: SystemState) => () => {
      return !!state.sessionToken;
    },
  },
  mutations: { 
    SET_TOKEN(state, sessionToken: string) {
      state.sessionToken = sessionToken;
    },
  },
  actions: {
    async SIGN_IN({ commit, dispatch }, token: string) {
      if (token) {
        commit('SET_TOKEN', token);
        return true;
      }
      return false;
    },
  },
  modules: {
  },
});
 