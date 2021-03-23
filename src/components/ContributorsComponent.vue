<template>
  <div class="container">
    <div class="row">
      <simple-button class="col-4" @click="analizeCommits()" text="Анализ коммитов" />
    </div>
    <div class="col-12">
      <div class="tab">
        <button class="tablinks" @click="type = 0">Активные</button>
        <button class="tablinks" @click="type = 1">Пассивные</button>
      </div>

      <list-component :list="sortedContributors" :rows="30" no-pagination>
        <template v-slot:default="{ item }">
          <author-info :item="item"></author-info>
        </template>
      </list-component>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SimpleButton from './SimpleButton.vue';
import ListComponent from './ListComponent.vue';
import AuthorInfo from './AuthorInfo.vue';

export default Vue.extend({
  components: { SimpleButton, ListComponent, AuthorInfo },
  props: {
    commits: { type: Array, required: true },
    filter: { type: Object, required: true },
  },
  data() {
    return {
      contributors: [] as any,
      type: 0,
    };
  },
  computed: {
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
});
</script>

<style>
</style>
