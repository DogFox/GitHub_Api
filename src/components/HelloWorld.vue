<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <filter-component></filter-component>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import FilterComponent from './FilterComponent.vue';

export default Vue.extend({
  name: 'hello',
  components: {
    FilterComponent,
  },
  props: {
    msg: { type: String, default: '' },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
