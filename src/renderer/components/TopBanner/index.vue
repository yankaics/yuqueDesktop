<template>
  <div :class="$style.wrap">
    <div :class="$style.container">
      <div :class="$style.left">
        <User />
        <Arrow />
        <Tools />
      </div>
      <!-- <div class="middle"> -->
      <!-- 中间 -->
      <!-- <button @click="aaa">asdfasdf</button> -->
      <!-- </div> -->
      <div :class="$style.right">

      </div>
    </div>
  </div>
</template>

<script>
import User from "./components/User";
import Arrow from "./components/Arrow";
import Tools from "./components/Tools";
export default {
  name: 'TopBanner',
  components: {
    User, Arrow, Tools
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

<style lang='scss' module>
.wrap {
  height: 60px;
  user-select: none;
}
.container {
  position: relative;
  display: flex;
  justify-content: space-between;
  // 开启窗口拖动
  -webkit-app-region: drag;
  // width: 100%;
  height: 40px;
  z-index: 100;
  background-image: linear-gradient(#e1e1e4, #d5d6dd);
  min-width: 956px;
  padding-top: 20px;
  padding: 20px 10px 0 10px;
}
.left {
  display: flex;
  align-items: center;
  flex: 1;
  :global(div) {
    // 所有子元素不可拖动
    -webkit-app-region: no-drag;
  }
}
.right {
  flex: 1;
}
</style>