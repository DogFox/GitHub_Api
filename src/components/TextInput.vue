<template>
  <div class="input-wrapper">
    <div class="label">
      {{ label }}
    </div>
    <input class="input" v-bind="$attrs" :value="value" :type="type" list="reps" @input="onChange($event)" />
    <datalist id="reps">
      <option v-if="loading" :value="value" selected>Идет загрузка...</option>
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
    loading: { type: Boolean, default: false },
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

<style scoped>
.input-wrapper {
  padding: 5px 10px 5px 10px;
  margin: 0px 10px 0px 10px;
  width: 100%;
}
.input {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  border: none;
  border-bottom: 1px solid black;
  height: 30px;
  outline: none;
  width: 100%;
}
.input:focus {
  border: none;
  border-bottom: 1px solid blue;
  transition: all .5s ;
}
</style>
