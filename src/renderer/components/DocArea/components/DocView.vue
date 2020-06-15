<template>
  <div :class="$style.wrap">
    <Top :class="$style.top" :title="title" />
    <div v-html="docHTML" :class="$style.text"></div>
    <!-- <GroupList :class="$style.groupCategory" /> -->
  </div>
</template>

<script>
import Top from "./Top";
export default {
  name: 'DocView',
  components: {
    Top
  },
  props: {
    doc: {
      type: Object,
      default: () => ({
        body_html: '',
        title: ''
      })
    },
  },
  data() {
    return {

    };
  },
  computed: {
    docHTML() {
      return this.doc.body_html;
    },
    title() {
      return this.doc.title;
    }
  },
  methods: {

  },
}
</script>

<style lang='scss' module>
// ！为了使用 rem 单位每个vue组件都要导入 begin
// $page-width: 375;
// @import '~style/tool';
.wrap {
  display: flex;
  flex-direction: column;
  user-select: none;
  height: 100%;
}
.top {
  height: 60px;
}
.text {
  flex: 1;
  // overflow:hidden;
  overflow-y: auto;
  user-select: text;
  padding: 25px;
}
</style>