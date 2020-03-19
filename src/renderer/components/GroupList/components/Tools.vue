<template>
  <div :class="$style.wrap">
    <div :class="$style.createDoc" @click="createDoc">
      <span>新建文档</span>
      <div :class="$style.arrow"></div>
    </div>
  </div>
</template>

<script>
import { remote } from 'electron';
import { createMenu } from "helper/ui/menu";
export default {
  name: 'Tools',
  components: {

  },
  data() {
    return {

    };
  },
  computed: {

  },
  mounted() {
    this.initMenu();
  },
  methods: {
    initMenu() {
      const menu = [
        { label: '笔记', click() { console.log('新建笔记') } },
        { label: '文件夹', click() { console.log('文件夹') } }
      ]
      this.menu = createMenu(menu);
    },
    createDoc() {
      this.menu.popup({ window: remote.getCurrentWindow(), x: 50, y: 110 });
    }
  },

}
</script>

<style lang='scss' module>
.wrap {
  // height: 60px;
  border-bottom: 1px solid #e1e0e5;
}
.createDoc {
  display: flex;
  align-items: center;
  height: 60px;
  background: url('assets/create.png') no-repeat center left;
  background-size: 25px 25px;
  margin-left: 20px;
  cursor: default;
  span {
    font-size: 14px;
    padding-left: 35px;
    padding-top: 2px;
  }
}
.arrow {
  margin-left: 2px;
  position: relative;
  width: 20px;
  height: 40px;
  &::after {
    content: '';
    position: absolute;
    top: 20px;
    left: 5px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 4px 0 4px;
    border-color: #959fb2 transparent transparent transparent;
  }
}
</style>