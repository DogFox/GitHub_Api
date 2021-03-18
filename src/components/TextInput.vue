<template>
  <div class="input-wrapper">
    <div class="label">{{label}}</div>
    <input v-model="value" :type="type" @input="onChange" >
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
    type: { type: String, default: 'text' },
    value: { type: String, default: undefined },
  },
  data() {
    return {};
  },
  methods: {
    onChange() {
      this.$emit('input', this.value);
    },
  },
});
</script>