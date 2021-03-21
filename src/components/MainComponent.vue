<template>
  <div class="main_wrapper">
    <filter-component :item="item" :branches="branches"></filter-component>
    <div>
      <simple-button @click="onClick()" text="О репе" />
      <simple-button @click="getPulls()" text="Пуллреквесты" />
    </div>

    <pull-requests :filter="item" :pulls="pulls"></pull-requests>

    <!-- <div>
      <span>{{ contributors.length }}</span>
      <div v-for="item in contributors" v-bind:key="item.value">
        <span> Логин: {{ item.login }} Коммиты: {{ item.contributions }} </span>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SimpleButton from './SimpleButton.vue';
import FilterComponent from './FilterComponent.vue';
import PullRequests from './PullRequests.vue';
import moment from 'moment';

export default Vue.extend({
  name: 'MainComponent',
  components: { SimpleButton, FilterComponent, PullRequests },
  props: {},
  data() {
    return {
      repository: {} as any,
      branches: [],
      contributors: [],
      pulls: [],
      item: {
        url: 'microsoft/vscode',
        dateStart: moment().format('YYYY-MM-DD'),
        dateEnd: moment().format('YYYY-MM-DD'),
        branch: '',
      },
    };
  },
  computed: {
    branches_url(): string {
      return this.repository && this.repository.url ? this.repository.url + '/branches' : '';
    },
    contributors_url(): string {
      return this.repository && this.repository.contributors_url ? this.repository.contributors_url : '';
    },
    pulls_url(): string {
      return this.repository && this.repository.url ? this.repository.url + '/pulls' : '';
    },
  },
  methods: {
    check(payload: any) {
      console.log(payload);
    },
    async onClick() {
      const result = await new this.$http().get('repos/' + this.item.url);
      if (result) {
        this.repository = result;
      }
    },
    async getBranches() {
      this.branches = await new this.$http().fetch(this.branches_url);
    },
    async getContributors() {
      const result = await new this.$http().get(this.contributors_url);
      if (result) {
        this.contributors = result;
      }
    },
    async getPulls() {
      const params = {
        base: this.item.branch,
        state: 'all',
      };
      this.pulls = await new this.$http().fetch(this.pulls_url, params);
    },
  },

  watch: {
    branches_url: {
      immediate: true,
      handler(to) {
        if (to) {
          this.getBranches();
        }
      },
    },
    contributors_url: {
      immediate: true,
      handler(to) {
        if (to) {
          this.getContributors();
        }
      },
    },
  },
});
</script>

<style>
</style>
