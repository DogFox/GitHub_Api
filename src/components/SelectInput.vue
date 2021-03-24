<template>
  <div class="input-wrapper">
    <div class="label">
      {{ label }}
    </div>
    <select class="select" :value="value" @change="onChange($event.target.value)">
      <option v-for="item in preparedArray" :key="item.index" :selected="checkSelected(item.index)">
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
      const index = this.preparedArray.findIndex((item: any) => item[this.itemText] === this.value);
      return index === -1 ? 0 : index;
    },
  },
  methods: {
    checkSelected(index: number) {
      if (index === this.selectedIndex) {
        this.onChange(this.preparedArray[index][this.itemText]);
        return true;
      }
      return false;
    },
    onChange(value: string) {
      this.$emit('change', value);
    },
  },
});
</script>

<style scoped>
.select {
  border: none;
  border-bottom: 1px solid black;
  height: 30px;
  outline: none;
  width: 100%;
}
</style>
