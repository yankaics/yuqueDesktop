<template>
  <div :class="$style.arrow">

  </div>
</template>

<script>
export default {
  name: 'Arrow',
  components: {

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
.arrow {
  position: relative;
  width: 20px;
  height: 40px;
  &::after {
    content: '';
    position: absolute;
    top: 19px;
    left: 5px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 4px 0 4px;
    border-color: #707991 transparent transparent transparent;
  }
}
</style>