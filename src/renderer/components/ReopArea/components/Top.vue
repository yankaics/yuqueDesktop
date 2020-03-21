<template>
  <div :class="$style.wrap">
    <p :class="$style.title">{{reopName}}</p>
    <el-button size="mini" @click="handleToolClick" ref="btn" :class="$style.btn">
      <i class="el-icon-s-operation" />
      <i :class="$style.arrow" />
    </el-button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { createMenu } from "helper/ui/menu";

const { mapState: infoState, mapMutations: infoMutations } = createNamespacedHelpers("Info/");


export default {
  name: 'ReopAreaTop',
  components: {
  },
  data() {
    return {
      chk: true
    };
  },
  computed: {
    ...infoState(['reopName'])
  },
  mounted() {
    this.initMenu();
  },
  methods: {
    handleToolClick(e) {
      const { left, bottom } = this.$refs.btn.$el.getBoundingClientRect()
      this.menu.popup({ x: Math.floor(left), y: Math.floor(bottom + 10) });
      this.$refs.btn.$el.blur();
    },
    initMenu() {
      const menu = [
        {
          label: '摘要',
          click() { console.log('新建笔记') },
          type: 'radio',
          checked: true
        },
        {
          label: '列表',
          click() { console.log('文件夹') },
          type: 'radio',
        },
        {
          type: 'separator',
        },
        {
          label: '创建时间',
          click() { console.log('文件夹') },
          type: 'radio',
        },
        {
          label: '修改时间',
          click() { console.log('文件夹') },
          type: 'radio',
          checked: true
        },
        {
          label: '文件名称',
          click() { console.log('文件夹') },
          type: 'radio',
        },
      ]
      this.menu = createMenu(menu);
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