<template>
  <div class="list">
    <div v-for="item in paginatedList" v-bind:key="item.value">
      <slot :item="item"></slot>
    </div>
    <div class="pagination row" v-if="!hide || noPagination">
      <div class="col-6">
        <div class="row pages">
          <span>{{ page + 1 }} / {{ maxPage }}</span>
          <text-input v-model="rowCount" size="3"></text-input>
        </div>
      </div>
      <div>
        <button class="btn" @click="decreasePage()">Туда</button>
        <button class="btn" @click="increasePage()">Сюда</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TextInput from './TextInput.vue';

export default Vue.extend({
  components: { TextInput },
  name: 'ListComponent',
  props: {
    list: { type: Array, required: true },
    rows: { type: Number, default: 25 },
    noPagination: { type: Boolean, default: false },
  },
  data() {
    return {
      page: 0,
      rowCount: this.rows,
    };
  },
  computed: {
    paginatedList(): any {
      const from = this.page * +this.rowCount;
      const to = from + +this.rowCount;
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

<style scoped>
.row {
  justify-content: start;
}
.pagination {
  border-top: 1px solid black;
}
.pagination .btn {
  margin: 5px;
}
</style>
