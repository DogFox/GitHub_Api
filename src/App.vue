<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/octocat.png" />
    <div class="hello">
      <h1>{{ msg }}</h1>
      <filter-component v-if="isAuth"></filter-component>
      <auth-btn v-else />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import FilterComponent from './components/FilterComponent.vue';
import AuthBtn from './components/AuthBtn.vue';

export default Vue.extend({
  components: { FilterComponent, AuthBtn },
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
}
</style>
