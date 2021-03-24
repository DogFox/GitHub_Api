<template>
  <div class="container">
    <div class="row">
      <simple-button v-if="false" class="col-4" @click="analizePulls()" text="АнализПуллов" />
      <div class="summary">
        <span> Всего за период: {{ filteredPulls.length }}</span>
        <span> Открытых: {{ openPulls.length }}</span>
        <span> Закрытых: {{ closedPulls.length }}</span>
        <span> Старых: {{ longwaitPulls.length }}</span>
      </div>
    </div>

    <div class="col-12">
      <tabs-bar :items="tabs" itemText="name" @selected="type = $event.type" />
      <list-component :list="choosenArray" :headers="headers" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';

import SimpleButton from './SimpleButton.vue';
import ListComponent from './ListComponent.vue';
import TabsBar from './TabsBar.vue';

export default Vue.extend({
  name: 'PullsComponent',
  components: { SimpleButton, ListComponent, TabsBar },
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
      tabs: [
        { name: 'Все', type: 0 },
        { name: 'Открытые', type: 1 },
        { name: 'Закрытые', type: 2 },
        { name: 'Старые', type: 3 },
      ],
      headers: [
        { title: 'Заголовок', cols: 4, field: 'title' },
        { title: 'Состояние', cols: 3, field: 'state' },
        { title: 'Автор', cols: 3, field: 'username' },
        { title: 'Создан', cols: 2, field: 'created' },
        { title: 'Дней открыт', cols: 2, field: 'duration' },
      ],
    };
  },
  created() {
    this.analizePulls();
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
        let toBeOrNotToBe = false;
        toBeOrNotToBe = !this.filter.dateStart || moment(pull.created_at).format('YYYY-MM-DD') >= this.filter.dateStart;
        toBeOrNotToBe = !this.filter.dateEnd || moment(pull.created_at).format('YYYY-MM-DD') <= this.filter.dateEnd;
        return toBeOrNotToBe;
      });
      this.openPulls = [];
      this.closedPulls = [];
      this.longwaitPulls = [];
      const longwaitDate = moment().add(-30, 'days').format('YYYY-MM-DD');
      // Подбили количество
      this.filteredPulls.forEach((pull: any) => {
        pull.created = moment(pull.created_at).format('YYYY-MM-DD');
        pull.duration = moment().diff(pull.created, 'days');
        pull.username = pull.user.login;
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
    pullsLength: {
      handler() {
        this.analizePulls();
      },
    },
  },
});
</script>

<style scoped>
.row {
  justify-content: flex-start;
}
.summary span {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  font-size: 16px;
}
</style>
