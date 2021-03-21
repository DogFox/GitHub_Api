<template>
  <div class="wrapper">
    <div class="label">
      {{ label }}
    </div>
    <select class="select" :value="value" @change="onChange($event)">
      <option v-for="item in items" v-bind:key="item.value">
        {{ item[itemText] }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    label: { type: String, default: '' },
    itemText: { type: String, default: 'text' },
    value: { type: String, default: undefined },
    items: { type: Array, required: true },
  },
  data() {
    return {};
  },
  methods: {
    onChange(payload: any) {
      this.$emit('change', payload.target.value);
    },
  },
});
</script>

<style>
.wrapper {
  padding: 5px 10px 5px 10px;
  margin: 0px 10px 0px 10px;
}
.select {
  min-width: 200px;
}
</style>
