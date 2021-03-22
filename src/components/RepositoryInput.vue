<template>
  <text-input :value="value" label="URL репозитория" :hints="hints" @input="$emit('input', $event)" :loading="loading" />
</template>

<script lang="ts">
import Vue from 'vue';
import TextInput from './TextInput.vue';

export default Vue.extend({
  model: {
    prop: 'value',
    event: 'input',
  },
  name: 'RepositoryInput',
  components: { TextInput },
  props: {
    value: { type: String, required: true },
  },
  data() {
    return {
      hints: [],
      loading: false,
    };
  },
  methods: {
    async getHints() {
      let usersReposUrl = '';
      // Если http найден - считаем что ссылка полная
      const index = this.value.indexOf('http');
      if (index === -1) {
        const parsedUrl = this.value.split('/');
        usersReposUrl = 'users/' + parsedUrl[0] + '/repos';
      }
      let hintResult = null;
      this.loading = true;
      try {
        hintResult = await new this.$http().fetch(usersReposUrl);
      } catch (error) {
        return;
      }
      this.loading = false;
      // const hintResult = await new this.$http().fetch(usersReposUrl);
      this.hints = hintResult.map((rep: any) => {
        return rep.full_name;
      });
    },
  },
  watch: {
    value: {
      handler(to) {
        // В общем то можно всегда дергать апи, но если будет аккаунт microsoft - устанем ждать
        // if (to.indexOf('/') > 0) {
        this.getHints();
        // }
      },
    },
  },
});
</script>

<style>
</style>
