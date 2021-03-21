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

      <list-component :list="contributors">
        <template v-slot:default="{ item }">
          <span>Логин: {{ item.name }}</span>
          <span>Коммитов: {{ item.count }}</span>
        </template>
      </list-component>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SimpleButton from './SimpleButton.vue';
import ListComponent from './ListComponent.vue';

export default Vue.extend({
  components: { SimpleButton, ListComponent },
  props: {
    commits: { type: Array, required: true },
    filter: { type: Object, required: true },
  },
  data() {
    return {
      contributors: [] as any,
    };
  },
  methods: {
    analizeCommits() {
      this.contributors = this.commits.reduce((total: any, commit: any) => {
        const index = total.findIndex((obj: any) => obj.name === commit.author.login);
        if (index >= 0) {
          total[index].count++;
        } else {
          total.push({
            name: commit.author.login,
            count: 1,
          });
        }
        return total;
      }, []);

      console.log(this.contributors);
    },
  },
});
</script>

<style>
</style>
