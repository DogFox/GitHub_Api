<template>
    <div class="filter">
      <text-input label="URL репы" v-model="item.url"  @input="check($event)"></text-input>
      <text-input label="Период с" v-model="item.dateStart" type="date" @input="check($event)"></text-input>
      <text-input label="Период по" v-model="item.dateEnd" type="date" @input="check($event)"></text-input>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TextInput from './TextInput.vue';
import moment from 'moment';

export default Vue.extend({
  name: 'FilterComponent',
  components: { TextInput },
  props: {},
  data() {
    return {
      item: {
        url: '',
        dateStart: moment().format('YYYY-MM-DD'),
        dateEnd: moment().format('YYYY-MM-DD'),
      },
    };
  },
  methods: {
    check(payload: any) {
      console.log(payload);
    },
  },
});
</script>