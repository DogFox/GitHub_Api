<template>
  <div class="list">
    <div v-for="item in paginatedList" v-bind:key="item.value">
      <slot :item="item"></slot>
    </div>
    <div v-if="!hide">
      <button class="pagination" @click="decreasePage()">Туда</button>
      <button class="pagination" @click="increasePage()">Сюда</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ListComponent',
  props: {
    list: { type: Array, required: true },
    rowCount: { type: Number, default: 25 },
  },
  data() {
    return {
      page: 0,
    };
  },
  computed: {
    paginatedList(): any {
      const from = this.page * this.rowCount;
      const to = from + this.rowCount;
      return this.list.slice(from, to);
    },
    maxPage(): number {
      return Math.ceil(this.list.length / this.rowCount) - 1;
    },
    hide(): boolean {
      return this.maxPage === 0;
    },
  },
  methods: {
    decreasePage() {
      if (this.page > 0) {
        this.page--;
      }
    },
    increasePage() {
      if (this.page < this.maxPage) {
        this.page++;
      }
    },
  },
  watch: {
    list: {
      handler() {
        this.page = 0;
      },
      deep: true,
    },
  },
});
</script>

<style>
.pagination {
  margin: 5px;
}
</style>
