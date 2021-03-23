<template>
  <div class="main_wrapper">
    <filter-component :item="item" :branches="branches"></filter-component>
    <div class="row">
      <simple-button @click="onClick()" text="О репозитории" />
      <simple-button @click="clearFilter()" text="Сбросить фильтры" />
      <!-- <simple-button @click="getCommits()" text="Коммиты" /> -->
    </div>
    {{ item }}
    <template v-if="showData">
      <template v-if="loading">
        <span>Загрузка данных...</span>
      </template>
      <template v-else>
        <contributors-component :filter="item" :commits="commits"></contributors-component>
        <pull-requests :filter="item" :pulls="pulls"></pull-requests>
      </template>
    </template>
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
        url: 'octocat/hello',
        dateStart: null,
        dateEnd: null,
        branch: 'main',
      },
      loading: false,
      showData: false,
    };
  },
  computed: {
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
    clearFilter() {
      this.item = {
        url: 'octocat/hello',
        dateStart: null,
        dateEnd: null,
        branch: 'main',
      };
    },
    async onClick() {
      // https://api.github.com/repos/microsoft/vscode
      // Если http найден - считаем что ссылка полная
      let reposUrl = '';
      const index = this.item.url.indexOf('http');
      reposUrl += (index >= 0 ? '' : 'repos/') + this.item.url;
      const result = await new this.$http().get(reposUrl);
      if (result) {
        this.repository = result;
      }
      this.showData = true;
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
    'item.branch': {
      handler(to) {
        if (to) {
          this.getPulls();
          this.getCommits();
        }
      },
    },
    // Не надо забирать реквесты, там все равно нет фильтра по дате, а коммиты как раз отфильтруем сразу при запросе
    'item.dateStart': {
      handler(to) {
        if (to) {
          this.getCommits();
        }
      },
    },
    'item.dateEnd': {
      handler(to) {
        if (to) {
          this.getCommits();
        }
      },
    },
  },
});
</script>

<style>
</style>
