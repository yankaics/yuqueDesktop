<template>
  <div :class="$style.wrap">
    <Tools :class="$style.tools" />
    <div :class="$style.groupCategory">
      <GroupList />
    </div>
  </div>
</template>

<script>
import Tools from "./components/Tools";
import GroupList from "./components/GroupList";
export default {
  name: 'GroupArea',
  components: {
    Tools, GroupList
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
.tools {
  height: 50px;
}
.groupCategory {
  flex: 1;
  // overflow:hidden;
  overflow-y: auto;
}
</style>