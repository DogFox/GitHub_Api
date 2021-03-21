<template>
  <div class="info">
    <span>Заголовок: {{ item.title }}</span>
    <span>Состояние: {{ item.state }}</span>
    <span>Автор: {{ item.user.login }}</span>
    <span>Создан: {{ item.created_at }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'FilterComponent',
  props: {
    item: { type: Object, required: true },
  },
});
</script>

<style>
span {
  padding: 1rem 1rem 1rem 1rem;
}
</style>
