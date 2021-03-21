<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/octocat.png">
    <div class="hello">
      <h1>{{ msg }}</h1>
      <main-component v-if="isAuth" />
      <auth-btn v-else />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import MainComponent from './components/MainComponent.vue';
import AuthBtn from './components/AuthBtn.vue';

export default Vue.extend({
  components: { MainComponent, AuthBtn },
  data() {
    return {
      msg: 'Welcome to GitHub Reviewer',
    };
  },
  computed: {
    isAuth(): boolean {
      return this.$store.getters.isAuth();
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  box-sizing: border-box;
}
</style>
