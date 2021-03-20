<template>
  <div>
    <a href="https://github.com/login/oauth/authorize?client_id=80984aed8beddbdcba77&state=80984aed">
      <button>GitHub</button>
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data () {
    return {
      state: '80984aed',
    };
  },
  computed: {
    url_string (): string {
      return window.location.href;
    },
    code (): string {
      const url = new URL(this.url_string);
      const code = url.searchParams.get('code');
      return code || '';
    },
  },
  watch: {
    code: {
      immediate: true,
      handler (to) {
        if (to) {
          this.authenticate(to);
        }
      },
    },
  },
  methods: {
    async authenticate (tempCode: string) {
      const result = await new this.$http().auth(tempCode, this.state);
      if (result && result.access_token) {
        const accessToken = result.access_token;
        const isAuth = this.$store.dispatch('SIGN_IN', accessToken);
      }
    },
  },
});
</script>
