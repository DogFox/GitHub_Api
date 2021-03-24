<template>
  <div class="tabs">
    <button class="tab" v-for="item in items" :key="item[itemText]" @click="$emit('selected', item)">{{ item[itemText] }}</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    items: { type: Array, required: true },
    itemText: { type: String, required: true },
  },
});
</script>

<style scoped>
</style>
