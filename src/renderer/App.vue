<template>
  <div id="app">
    <TopBanner />
    <router-view :key="$router.path" />
    <button @click="aaa">123123123</button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { openWinModal } from "helper/ui/win";
import { msgInfo, msgErr, msgYesNo } from "helper/ui/dialog";
import TopBanner from 'components/TopBanner';
import electron from "electron";

const { mapGetters: userGetters, mapActions } = createNamespacedHelpers("user/");

export default {
  name: 'yuque-desktop',
  components: {
    TopBanner
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
  },
  watch: {
    userToken() {
      console.log('1111111')
    }
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
    }
  }
}
</script>

<style>
/* body { */
/* */
/* } */
body {
  /* height: 100%; */
  width: 100%;
  margin: 0;
}
</style>
