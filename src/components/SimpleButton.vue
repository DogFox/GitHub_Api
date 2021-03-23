<template>
  <div class="wrapper">
    <button @click="$emit('click')">{{ text }}</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    text: { type: String, default: 'Кнопка' },
  },
});
</script>

<style scoped>
.wrapper {
  padding: 5px 10px 5px 10px;
  margin: 0px 10px 0px 10px;
}
</style>
