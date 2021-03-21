<template>
  <div>
    <simple-button @click="analizePulls()" text="АнализПуллов" />
    <div>
      <span> Всего за период: {{ filteredPulls.length }}</span>
      <span> Открытых: {{ openPulls.length }}</span>
      <span> Закрытых: {{ closedPulls.length }}</span>
      <span> Старых: {{ longwaitPulls.length }}</span>
    </div>

    <div>
      <div v-for="item in filteredPulls" v-bind:key="item.value">
        <span> Заголовок: {{ item.title }} Состояние: {{ item.state }} Автор: {{ item.user.login }} Создан: {{ item.created_at }} </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';

import SimpleButton from './SimpleButton.vue';
export default Vue.extend({
  name: 'PullsComponent',
  components: { SimpleButton },
  props: {
    pulls: { type: Array, required: true },
    filter: { type: Object, required: true },
  },
  data() {
    return {
      filteredPulls: [] as any,
      openPulls: [] as any,
      closedPulls: [] as any,
      longwaitPulls: [] as any,
    };
  },
  methods: {
    analizePulls() {
      // Отфильтровали по периоду времени
      this.filteredPulls = this.pulls.filter((pull: any) => {
        return moment(pull.created_at).format('YYYY-MM-DD') >= this.filter.dateStart && moment(pull.created_at).format('YYYY-MM-DD') <= this.filter.dateEnd;
      });

      const longwaitDate = moment().add(-30, 'days').format('YYYY-MM-DD');
      // Подбили количество
      this.filteredPulls.forEach((pull: any) => {
        if (pull.state === 'open') {
          this.openPulls.push(pull);
        } else {
          this.closedPulls.push(pull);
        }
        if (moment(pull.created_at).format('YYYY-MM-DD') < longwaitDate) {
          this.longwaitPulls.push(pull);
        }
      });
      console.log(this.pulls);
      console.log(this.filteredPulls);
      console.log(this.openPulls);
    },
  },
});
</script>

<style>
.filter {
  display: inline-flex;
}
</style>
