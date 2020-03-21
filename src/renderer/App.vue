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
import electron, { webFrame } from "electron";
import { openWinModal } from "helper/ui/win";
import { msgInfo, msgErr, msgYesNo } from "helper/ui/dialog";
// import components
import TopBanner from 'components/TopBanner';
import Layout from "components/Layout";

// api
import { GetUserInfo } from "./api";
// import {  } from "store/modules/Info";
import { types as infoTypes } from "store/modules/Info";


const { mapState: globalState, mapGetters: globalGetters, mapActions: globalActions } = createNamespacedHelpers("Global/");
const { mapMutations: infoMutations } = createNamespacedHelpers("Info/");

const { SET_USER_AVATAR, SET_USER_ID } = infoTypes;

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
    ...globalGetters(["isLogin"]),
    ...globalState(['token']),
    userToken() {
      return this.token;
    }
  },
  created() {
    // 检查登录状态
    this.login();
    console.log('app created')
  },
  mounted() {
    // 登录逻辑
    this.initWin();
  },
  watch: {
  },
  destroyed() {
    // msgInfo('销毁了')
  },
  methods: {
    ...globalActions(["login"]),
    ...infoMutations([SET_USER_ID, SET_USER_AVATAR]),
    async login() {
      let data = await GetUserInfo();
      let { avatar_url, login } = data;
      this.SET_USER_ID(login);
      this.SET_USER_AVATAR(avatar_url);
      // this.avatar = avatar_url;
      // this.username = login;
    },
    initWin() {
      // 防止内部图片被拖动
      document.ondragstart = () => {
        return false;
      }
      // 禁止使用ctrl及双指缩放
      webFrame.setZoomFactor(1);
      webFrame.setVisualZoomLevelLimits(1, 1);
      webFrame.setLayoutZoomLevelLimits(0, 0);
    },

  },

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
