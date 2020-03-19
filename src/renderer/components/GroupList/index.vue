<template>
  <div :class="$style.wrap">
    <Tools />
  </div>
</template>

<script>
import Tools from "./components/Tools";
export default {
  name: 'GroupList',
  components: {
    Tools
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
  user-select: none;
}
</style>