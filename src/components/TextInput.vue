<template>
  <div class="input-wrapper">
    <div class="label">
      {{ label }}
    </div>
    <input v-bind="$attrs" :value="value" :type="type" list="reps" @input="onChange($event)" />
    <datalist id="reps">
      <option v-for="hint in hints" :key="hint" :value="hint" />
    </datalist>
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
    value: { type: [Number, String], default: undefined },
    hints: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    onChange(payload: any) {
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
