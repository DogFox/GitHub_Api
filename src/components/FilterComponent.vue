<template>
<div>

    <div class="filter">
      <text-input label="URL репы" v-model="item.url"  @input="check($event)"></text-input>
      <text-input label="Период с" v-model="item.dateStart" type="date" @input="check($event)"></text-input>
      <text-input label="Период по" v-model="item.dateEnd" type="date" @input="check($event)"></text-input>
    </div>
    <div>
      <button v-on:click="onClick()">Кнопка</button>
    </div>
    <div>
        <a href="https://github.com/login/oauth/authorize?client_id=80984aed8beddbdcba77">
          <button>Кнопка</button>

        </a>
    </div>
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
  computed: {
    url_string(): string {
      return window.location.href;
    },
    code(): string {
      let url = new URL(this.url_string);
      let code = url.searchParams.get('code');
      console.log(code);
      
      return code ? code : '';
    },
  },
  methods: {
    check(payload: any) {
      console.log(payload);
    },
    onClick() {},
    authenticate(temp_code: string) {
      console.log(temp_code);

      new this.$http().auth_post(temp_code);
    },
  },
  watch: {
    code: {
      immediate: true,
      handler(to) {
        console.log(to);
        
        if (to) {
          this.authenticate(to);
        }
      },
    },
  },
});
</script>