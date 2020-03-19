<template>
  <div id="app" class="mainWrap">
    <template v-if="isLogin">
      <TopBanner />
      <!-- <router-view :key="$router.path" /> -->
      <Layout />
    </template>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { openWinModal } from "helper/ui/win";
import { msgInfo, msgErr, msgYesNo } from "helper/ui/dialog";
import electron, { webFrame } from "electron";
// import components
import TopBanner from 'components/TopBanner';
import Layout from "components/Layout";

const { mapGetters: userGetters, mapActions } = createNamespacedHelpers("user/");

export default {
  name: 'yuque-desktop',
  components: {
    TopBanner, Layout
  },
  data() {
    return {

    }
  },
  computed: {
    ...userGetters(["isLogin", 'userInfo']),
    userToken() {
      return this.userInfo.token;
    }
  },
  mounted() {
    // 登录逻辑
    this.checkLogin();
    this.registerHandler();
    console.log(webFrame)
    webFrame.setZoomFactor(1);
    webFrame.setVisualZoomLevelLimits(1, 1);
    webFrame.setLayoutZoomLevelLimits(0, 0);
  },
  watch: {
  },
  destroyed() {
    // msgInfo('销毁了')
  },
  methods: {
    ...mapActions(["login"]),
    aaa() {
      msgYesNo('消息内容');
      // openWinModal();

    },
    checkLogin() {
      if (!this.isLogin) {
        console.log('未登录')
        // debugger;
        this.login();
      } else {
        console.log('已经登录的状态')
      }

      // console.log(this.isLogin)

      // const { BrowserWindow, BrowserView } = this.$electron.remote
      // let win = new BrowserWindow({ width: 800, height: 600 })
      // win.on('closed', () => {
      //   win = null
      // })

      // let view = new BrowserView()
      // win.setBrowserView(view)
      // view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
      // view.webContents.loadURL('https://electronjs.org')


      // console.log(a)
      // console.log(auth)
    },
    registerHandler() {
      document.ondragstart = () => {
        return false;
      }
    }
  }
}
</script>

<style>
html,
body {
  height: 100%;
}
body {
  width: 100%;
  margin: 0;
  font: caption;
  color: #393839;
}
.mainWrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
