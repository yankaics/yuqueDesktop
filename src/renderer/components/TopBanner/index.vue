<template>
  <div class="wrap">
    <div class="left">
      左边
    </div>
    <div class="middle">
      中间
      <button @click="aaa">asdfasdf</button>
    </div>
    <div class="right">
      右边
    </div>
  </div>
</template>

<script>

export default {
  name: 'TopBanner',
  components: {

  },
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {
    aaa() {

      // let top = new BrowserWindow()
      // let child = new BrowserWindow({ parent: top })
      // child.show()
      // top.show()
    }
  },
}
</script>

<style lang='scss' scoped>
.wrap {
  -webkit-app-region: drag;
  position: relative;
  // width: 100%;
  height: 40px;
  z-index: 100;
  background-image: linear-gradient(#e1e1e4, #d5d6dd);
  min-width: 956px;
  padding-top: 20px;
  padding: 20px 10px 0 10px;
  display: flex;
  justify-content: space-between;
}
.left {
}
</style>