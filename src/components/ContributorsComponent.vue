<template>
  <div class="container">
    <div class="col-12">
      <tabs-bar :items="tabs" itemText="name" @selected="type = $event.type" />
      <list-component :list="sortedContributors" :rows="30" no-pagination :headers="headers" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ListComponent from './ListComponent.vue';
import TabsBar from './TabsBar.vue';

export default Vue.extend({
  components: { ListComponent, TabsBar },
  props: {
    commits: { type: Array, required: true },
    filter: { type: Object, required: true },
  },
  data() {
    return {
      contributors: [] as any,
      type: 0,
      tabs: [
        { name: 'Активные', type: 0 },
        { name: 'Пассивные', type: 1 },
      ],
      headers: [
        { title: 'Автор', cols: 8, field: 'name' },
        { title: 'Коммитов', cols: 4, field: 'count' },
      ],
    };
  },
  created() {
    this.analizeCommits();
  },
  computed: {
    commitsLength(): number {
      return this.commits.length;
    },
    sortedContributors(): any {
      return [...this.contributors]
        .sort((a: any, b: any) => {
          return this.type ? a.count - b.count : b.count - a.count;
        })
        .slice(0, 30);
    },
  },
  methods: {
    analizeCommits() {
      const contr = this.commits.reduce((total: any, commit: any) => {
        // Попадаются коммиты без автора в commit.author, но он указан все равно в commit.commit
        const login = commit.author?.login || commit.commit.author.name;
        total[login] = (total[login] || 0) + 1;
        return total;
      }, {}) as any;

      this.contributors = [];
      for (const name in contr) {
        this.contributors.push({ name, count: contr[name] });
      }
    },
  },
  watch: {
    commitsLength: {
      handler() {
        this.analizeCommits();
      },
    },
  },
});
</script>

<style>
</style>
