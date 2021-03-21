<template>
  <div class="container">
    <div class="row">
      <simple-button class="col-4" @click="analizePulls()" text="АнализПуллов" />
      <div class="col-8">
        <span> Всего за период: {{ filteredPulls.length }}</span>
        <span> Открытых: {{ openPulls.length }}</span>
        <span> Закрытых: {{ closedPulls.length }}</span>
        <span> Старых: {{ longwaitPulls.length }}</span>
      </div>
    </div>

    <div class="col-12">
      <div class="tab">
        <button class="tablinks" @click="type = 0">Все</button>
        <button class="tablinks" @click="type = 1">Открытые</button>
        <button class="tablinks" @click="type = 2">Закрытые</button>
        <button class="tablinks" @click="type = 3">Старые</button>
      </div>

      <list-component :list="choosenArray">
        <template v-slot:default="{ item }">
          <request-info :item="item"></request-info>
        </template>
      </list-component>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';

import SimpleButton from './SimpleButton.vue';
import RequestInfo from './RequestInfo.vue';
import ListComponent from './ListComponent.vue';

export default Vue.extend({
  name: 'PullsComponent',
  components: { SimpleButton, RequestInfo, ListComponent },
  props: {
    pulls: { type: Array, required: true },
    filter: { type: Object, required: true },
  },
  data() {
    return {
      type: 0,
      filteredPulls: [] as any,
      openPulls: [] as any,
      closedPulls: [] as any,
      longwaitPulls: [] as any,
    };
  },
  computed: {
    pullsLength(): number {
      return this.pulls.length;
    },
    choosenArray(): any {
      switch (this.type) {
        case 1:
          return this.openPulls;
        case 2:
          return this.closedPulls;
        case 3:
          return this.longwaitPulls;
        default:
          return this.filteredPulls;
      }
    },
  },
  methods: {
    analizePulls() {
      // Отфильтровали по периоду времени
      this.filteredPulls = this.pulls.filter((pull: any) => {
        return moment(pull.created_at).format('YYYY-MM-DD') >= this.filter.dateStart && moment(pull.created_at).format('YYYY-MM-DD') <= this.filter.dateEnd;
      });
      this.openPulls = [];
      this.closedPulls = [];
      this.longwaitPulls = [];
      const longwaitDate = moment().add(-30, 'days').format('YYYY-MM-DD');
      // Подбили количество
      this.filteredPulls.forEach((pull: any) => {
        pull.created = moment(pull.created_at).format('YYYY-MM-DD');
        pull.duration = moment().diff(pull.created, 'days');
        if (pull.state === 'open') {
          this.openPulls.push(pull);
          if (pull.created < longwaitDate) {
            this.longwaitPulls.push(pull);
          }
        } else {
          this.closedPulls.push(pull);
        }
      });
    },
  },
  watch: {
    filter: {
      handler() {
        this.analizePulls();
      },
      deep: true,
    },
  },
});
</script>

<style>
.tab {
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}
.tablinks {
  border: none;
  padding: 15px 15px;
  margin: 1px 1px;
}
.tablinks:hover {
  background-color: #ddd;
}
</style>
