<template>
  <div class="row" @click="onRowClick()">
    <div v-for="header in headers" :class="'col-' + header.cols" :key="header.field">
      <span>{{ item[header.field] }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'RequestInfo',
  props: {
    item: { type: Object, required: true },
    headers: { type: Array, required: true },
  },
  methods: {
    onRowClick() {
      if (this.item.html_url) {
        window.open(this.item.html_url);
      }
    },
  },
});
</script>

<style scoped>
.row {
  text-align: start;
}
.row:hover {
  background-color: darkgray;
  color: blue;
}
</style>
