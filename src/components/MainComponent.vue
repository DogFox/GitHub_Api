<template>
  <div>
    <filter-component :item="item" :branches="branches"></filter-component>
    <div>
      <simple-button @click="onClick()" text="О репе" />
      <simple-button @click="getPulls()" text="Пуллреквесты" />
      <simple-button @click="analizePulls()" text="АнализПуллов" />
    </div>
    <div>
      {{ item }}
    </div>

    <div>
      <span>Всего за период: {{ filteredPulls.length }}</span>
      <span>Открытых: {{ analytics.openCount }}</span>
      <span>Закрытых: {{ analytics.closedCount }}</span>
      <span>Старых: {{ analytics.longwaitCount }}</span>
    </div>
    <div>
      <div v-for="item in filteredPulls" v-bind:key="item.value">
        <span> Заголовок: {{ item.title }} Состояние: {{ item.state }} Автор: {{ item.user.login }} Создан: {{ item.created_at }} </span>
      </div>
    </div>

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
import moment from 'moment';

export default Vue.extend({
  name: 'MainComponent',
  components: { SimpleButton, FilterComponent },
  props: {},
  data() {
    return {
      repository: {} as any,
      branches: [],
      contributors: [],
      pulls: [],
      filteredPulls: [],
      analytics: {
        openCount: 0,
        closedCount: 0,
        longwaitCount: 0,
      },
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
      console.log(this.pulls);
      this.analizePulls();
    },
    analizePulls() {
      let closedCount = 0;
      let openCount = 0;
      let longwaitCount = 0;
      // Отфильтровали по периоду времени
      this.filteredPulls = this.pulls.filter((pull: any) => {
        return moment(pull.created_at).format('YYYY-MM-DD') >= this.item.dateStart && moment(pull.created_at).format('YYYY-MM-DD') <= this.item.dateEnd;
      });

      const longwaitDate = moment().add(-30, 'days').format('YYYY-MM-DD');
      // Подбили количество
      this.filteredPulls.forEach((pull: any) => {
        if (pull.state === 'open') {
          openCount++;
        } else {
          closedCount++;
        }
        if (moment(pull.created_at).format('YYYY-MM-DD') < longwaitDate) {
          longwaitCount++;
        }
      });
      this.analytics.closedCount = closedCount;
      this.analytics.openCount = openCount;
      this.analytics.longwaitCount = longwaitCount;

      console.log(this.filteredPulls);
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
.filter {
  display: inline-flex;
}
</style>
