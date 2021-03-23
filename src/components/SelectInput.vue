<template>
  <div class="wrapper">
    <div class="label">
      {{ label }}
    </div>
    <select class="select" :value="value" @change="onChange($event)">
      <option v-for="item in preparedArray" :key="item.index" :selected="item.index === selectedIndex">
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
  computed: {
    preparedArray(): any {
      return this.items.map((item: any, index: number) => {
        item.index = index;
        return item;
      });
    },
    selectedIndex(): number {
      return this.preparedArray.findIndex((item: any) => item[this.itemText] === this.value);
    },
  },
  methods: {
    onChange(payload: any) {
      this.$emit('change', payload.target.value);
    },
  },
});
</script>

<style scoped>
.wrapper {
  padding: 5px 10px 5px 10px;
  margin: 0px 10px 0px 10px;
  width: 100%;
}
.select {
  min-width: 200px;
  border: none;
  border-bottom: 1px solid black;
  height: 30px;
  outline: none;
  width: 100%;
}
</style>
