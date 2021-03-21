<template>
  <div class="main_wrapper">
    <filter-component :item="item" :branches="branches"></filter-component>
    <div>
      <simple-button @click="onClick()" text="О репе" />
      <simple-button @click="getCommits()" text="Коммиты" />
    </div>
    <template v-if="branch">
      <template v-if="loading">
        <span>Загрузка данных...</span>
      </template>
      <template v-else>
        <contributors-component :filter="item" :commits="commits"></contributors-component>
        <pull-requests v-if="false" :filter="item" :pulls="pulls"></pull-requests>
      </template>
    </template>

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
import ContributorsComponent from './ContributorsComponent.vue';

export default Vue.extend({
  name: 'MainComponent',
  components: { SimpleButton, FilterComponent, PullRequests, ContributorsComponent },
  props: {},
  data() {
    return {
      repository: {} as any,
      branches: [],
      commits: [],
      pulls: [],
      item: {
        url: 'microsoft/vscode',
        dateStart: moment([2021, 1, 1]).format('YYYY-MM-DD'),
        dateEnd: moment().format('YYYY-MM-DD'),
        branch: '',
      },
      loading: false,
    };
  },
  computed: {
    branch(): string {
      return this.item.branch;
    },
    branches_url(): string {
      return this.repository && this.repository.url ? this.repository.url + '/branches' : '';
    },
    commits_url(): string {
      return this.repository && this.repository.url ? this.repository.url + '/commits' : '';
    },
    pulls_url(): string {
      return this.repository && this.repository.url ? this.repository.url + '/pulls' : '';
    },
  },
  methods: {
    async onClick() {
      const result = await new this.$http().get('repos/' + this.item.url);
      if (result) {
        this.repository = result;
      }
    },
    async getBranches() {
      this.branches = await new this.$http().fetch(this.branches_url);
    },
    async getCommits() {
      this.loading = true;
      const params = {
        sha: this.item.branch,
        state: 'all',
        since: moment(this.item.dateStart).toISOString(),
        until: moment(this.item.dateEnd).toISOString(),
      };
      this.commits = await new this.$http().fetch(this.commits_url, params);
      this.loading = false;
      console.log(this.commits);
    },
    async getPulls() {
      this.loading = true;
      const params = {
        base: this.item.branch,
        state: 'all',
      };
      this.pulls = await new this.$http().fetch(this.pulls_url, params);
      this.loading = false;
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
    branch: {
      immediate: true,
      handler(to) {
        if (to) {
          this.getPulls();
          this.getCommits();
        }
      },
    },
  },
});
</script>

<style>
</style>
