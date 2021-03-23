<template>
  <div class="filter_wrapper">
    <div class="row">
      <div class="col-6">
        <repository-input v-model="item.url" />
      </div>
      <div class="col-6">
        <select-input v-model="item.branch" :items="branches" label="Ветка" item-text="name" />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <text-input v-model="item.dateStart" label="Период с" type="date" />
      </div>
      <div class="col-6">
        <text-input v-model="item.dateEnd" label="Период по" type="date" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TextInput from './TextInput.vue';
import SelectInput from './SelectInput.vue';
import RepositoryInput from './RepositoryInput.vue';

export default Vue.extend({
  name: 'FilterComponent',
  components: { TextInput, SelectInput, RepositoryInput },
  props: {
    item: { type: Object, required: true },
    branches: { type: Array, required: true },
  },
});
</script>

<style >
.filter_wrapper {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.row {
  justify-content: center;
}
</style>
