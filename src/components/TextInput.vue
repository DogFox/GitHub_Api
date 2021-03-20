<template>
  <div class="input-wrapper">
    <div class="label">
      {{ label }}
    </div>
    <input
      :value="value"
      :type="type"
      @input="onChange($event)"
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    label: { type: String, default: '' },
    type: { type: String, default: 'text' },
    value: { type: String, default: undefined },
  },
  data () {
    return {};
  },
  methods: {
    onChange (payload: any) {
      this.$emit('input', payload.target.value);
    },
  },
});
</script>

<style>
  .input-wrapper {
    padding: 5px 10px 5px 10px;
    margin: 0px 10px 0px 10px;
  }
</style>
