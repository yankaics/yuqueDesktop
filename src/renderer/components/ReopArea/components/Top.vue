<template>
  <div :class="$style.wrap">
    <p :class="$style.title" :title="reopName">{{reopName}}</p>
    <el-button size="mini" @click="handleToolClick" ref="btn" :class="$style.btn">
      <i class="el-icon-s-operation" />
      <i :class="$style.arrow" />
    </el-button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { createMenu } from "helper/ui/menu";

import { reopOptsTypes, types } from "store/modules/Info";
const { mapState: infoState, mapMutations: infoMutations } = createNamespacedHelpers("Info/");

const { SHOW_LIST, SHOW_SUMMARY, SORT_CREATE_TIME, SORT_UPDATE_TIME, SORT_FILE_NAME } = reopOptsTypes
const { SET_SHOW_MODE, SET_SORT_MODE, SET_SORT_DESC } = types;


export default {
  name: 'ReopAreaTop',
  components: {
  },
  data() {
    return {
      chk: true,
    };
  },
  computed: {
    ...infoState(['reopName', 'reopOpts']),
    showMode() {
      return this.reopOpts.showMode;
    },
    sortMode() {
      return this.reopOpts.sortMode;
    },
    sortDesc() {
      return this.reopOpts.sortDesc;
    }
  },
  mounted() {
    // this.initMenu();
  },
  methods: {
    ...infoMutations([SET_SHOW_MODE, SET_SORT_MODE, SET_SORT_DESC]),
    handleToolClick(e) {
      this.initMenu();
      const { left, bottom } = this.$refs.btn.$el.getBoundingClientRect()
      this.menu.popup({ x: Math.floor(left), y: Math.floor(bottom + 10) });
      this.$refs.btn.$el.blur();
    },
    initMenu() {
      const menu = [
        {
          id: SHOW_SUMMARY,
          label: '摘要',
          click: () => { this.handleShowModeClick(SHOW_SUMMARY) },
          type: 'radio',
          checked: this.showMode === SHOW_SUMMARY
        },
        {
          id: SHOW_LIST,
          label: '列表',
          click: () => { this.handleShowModeClick(SHOW_LIST) },
          type: 'radio',
          checked: this.showMode === SHOW_LIST
        },
        {
          type: 'separator',
        },
        {
          id: SORT_CREATE_TIME,
          label: `创建时间${this.getSortDescStr(SORT_CREATE_TIME)}`,
          click: () => { this.handleSortModeClick(SORT_CREATE_TIME) },
          type: 'radio',
          checked: this.sortMode === SORT_CREATE_TIME
        },
        {
          id: SORT_UPDATE_TIME,
          label: `修改时间${this.getSortDescStr(SORT_UPDATE_TIME)}`,
          click: () => { this.handleSortModeClick(SORT_UPDATE_TIME) },
          type: 'radio',
          checked: this.sortMode === SORT_UPDATE_TIME
        },
        {
          id: SORT_FILE_NAME,
          label: `文件名称${this.getSortDescStr(SORT_FILE_NAME)}`,
          click: () => { this.handleSortModeClick(SORT_FILE_NAME) },
          type: 'radio',
          checked: this.sortMode === SORT_FILE_NAME
        },
      ]
      this.menu = createMenu(menu);
    },
    handleSortModeClick(sortMode) {
      if (this.sortMode === sortMode) {
        this.SET_SORT_DESC(!this.sortDesc);
      } else {
        this.SET_SORT_DESC(true);
        this.SET_SORT_MODE(sortMode);
      }
    },
    handleShowModeClick(showMode) {
      if (this.showMode === showMode) return;
      this.SET_SHOW_MODE(showMode);
    },
    getSortDescStr(sortMode) {
      if (this.sortMode === sortMode) {
        return this.sortDesc ? " ↓" : " ↑"
      } else {
        return ''
      }
    }
  },

}
</script>

<style lang='scss' module>
.wrap {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e1e0e5;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
}
.title {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: default;
}
.btn {
  &:global(.el-button--mini) {
    padding: 7px 15px 7px 10px;
  }
  .arrow {
    display: inline-block;
    // margin-left: 2px;
    position: relative;
    // width: 20px;
    // height: 40px;
    &::after {
      content: '';
      position: absolute;
      // top: 20px;
      // left: 5px;
      top: -5px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4px 4px 0 4px;
      border-color: #959fb2 transparent transparent transparent;
    }
  }
}
</style>