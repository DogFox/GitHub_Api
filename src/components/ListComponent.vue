<template>
  <div class="list">
    <div class="row headers">
      <!-- Пахнет как костыль -->
      <div v-for="header in headers" :class="'col-' + header.cols" :key="header.field">
        <span class="header">{{ header.title }}</span>
      </div>
    </div>
    <div v-for="item in paginatedList" v-bind:key="item.value">
      <slot :item="item" :headers="headers">
        <list-row-info :item="item" :headers="headers"></list-row-info>
      </slot>
    </div>
    <div class="pagination row" v-if="!hide || !noPagination">
      <div class="row left">
        <div class="page_number">
          <span>{{ page + 1 }}</span>
          <span> / </span>
          <span>{{ maxPage }}</span>
        </div>
        <input class="input small" v-model="rowCount" size="3" />
      </div>
      <div class="row right">
        <button class="button left_arrow" @click="decreasePage()">Туда</button>
        <button class="button right_arrow" @click="increasePage()">Сюда</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ListRowInfo from './ListRowInfo.vue';

export default Vue.extend({
  name: 'ListComponent',
  components: { ListRowInfo },
  props: {
    list: { type: Array, required: true },
    rows: { type: Number, default: 25 },
    noPagination: { type: Boolean, default: false },
    headers: {
      type: Array,
      default: () => {
        return [];
      },
    },
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
.page_number {
  position: relative;
  top: 10px;
}
.small {
  max-width: 75px;
  font-size: 8px;
  margin: 0 0 0 10px;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
}
.left {
  justify-content: flex-start;
}
.right {
  justify-content: flex-end;
}
.pagination {
  border-top: 1px solid black;
  justify-content: space-between;
}
.button {
  margin-top: 5px;
  min-width: 75px;
}
.left_arrow {
  margin-right: 10px;
  background-image: url('../assets/keyboard_arrow_left-24px.svg');
  background-repeat: no-repeat;
  background-position-y: 3px;
}
.right_arrow {
  margin-left: 10px;
  background-image: url('../assets/keyboard_arrow_right-24px.svg');
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: 3px;
}
.headers {
  text-align: start;
  justify-content: space-between;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  border-bottom: 1px solid black;
}
.headers span {
  font-size: 16px;
}
@media (max-width: 600px) {
  .headers span {
    font-size: 12px;
  }
}
</style>
