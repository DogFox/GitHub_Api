<template>
  <div class="row" @click="onRowClick()">
    <div class="col-6">
      <span>Заголовок: {{ item.title }}</span>
    </div>
    <div class="col-2">
      <span>Состояние: {{ item.state }}</span>
    </div>
    <div class="col-2">
      <span>Автор: {{ item.user.login }}</span>
    </div>
    <div class="col-2">
      <span>Создан: {{ item.created }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'RequestInfo',
  props: {
    item: { type: Object, required: true },
  },
  methods: {
    onRowClick() {
      window.open(this.item.html_url);
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
