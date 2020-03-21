<template>
  <div :class="$style.wrap">
    <Top :class="$style.top" />
    <DocList :class="$style.docList"/>
  </div>
</template>

<script>
import Top from "./components/Top";
import DocList from "./components/DocList";
export default {
  name: 'ReopArea',
  components: {
    Top, DocList
  },
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {

  },
}
</script>

<style lang='scss' module>
.wrap {
  display: flex;
  flex-direction: column;
  user-select: none;
  height: 100%;
}
.top {
  height: 60px;
}
.docList {
  flex: 1;
  // overflow:hidden;
  overflow-y: auto;
}
</style>