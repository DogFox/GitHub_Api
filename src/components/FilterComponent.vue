<template>
  <div>
    <div class="filter">
      <text-input v-model="item.url" label="URL репы" />
      <select-input v-model="item.branch" :items="branches" label="Ветка" item-text="name" />
    </div>
    <div>
      <text-input v-model="item.dateStart" label="Период с" type="date" />
      <text-input v-model="item.dateEnd" label="Период по" type="date" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TextInput from './TextInput.vue';
import SelectInput from './SelectInput.vue';
import moment from 'moment';

export default Vue.extend({
  name: 'FilterComponent',
  components: { TextInput, SelectInput },
  props: {
    item: { type: Object, required: true },
    branches: { type: Array, required: true },
  },
});
</script>

<style>
.filter {
  display: inline-flex;
}
</style>
