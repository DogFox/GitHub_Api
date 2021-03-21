<template>
  <div class="row">
    <div class="col-6">
      <span>Логин: {{ item.name }}</span>
    </div>
    <div class="col-2">
      <span>Коммитов: {{ item.count }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AuthorInfo',
  props: {
    item: { type: Object, required: true },
  },
});
</script>

<style scoped>
.row {
  text-align: start;
}
</style>
