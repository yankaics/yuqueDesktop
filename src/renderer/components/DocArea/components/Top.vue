<template>
  <div :class="$style.wrap">
    <div :class="$style.title">{{title}}</div>
    <div :class="$style.tools">
      <el-input placeholder="搜索" prefix-icon="el-icon-search" size="medium"
        :class="$style.txtSearch" />
      <el-button @click="onClickEdit" type="primary" size="small" :class="$style.btnEdit">编辑
      </el-button>
    </div>
  </div>
</template>

<script>
import { createMenu } from "helper/ui/menu";


export default {
  name: 'DocAreaTop',
  components: {
  },
  props: {
    title: {
      type: String,
      default: ''
    },
  },
  data() {
    return {

    };
  },
  computed: {

  },
  mounted() {
  },
  methods: {
    onClickEdit() {
      this.$parent.$parent.$emit('changeEdit');
    }
  },

}
</script>

<style lang='scss' module>
.wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e0e5;
  padding: 0 20px;
}
.title {
  min-width: 150px;
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: default;
}
.tools {
  min-width: 281px;
  .btnEdit {
    font-size: 14px;
  }
  .txtSearch {
    width: 200px;
    margin-right: 15px;
  }
}
</style>