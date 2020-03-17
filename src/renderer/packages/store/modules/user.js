// import getAppData from 'helper/getAppData';

// const userInfo = getAppData('userInfo', {});
import { setLocalStorage, getLocalStorage } from "helper/getAppData";
import { refreshMainWindow } from "helper/ui/win";
import auth from "helper/auth";

export const types = {
  SET_TOKEN: 'SET_TOKEN'
}

export default {
  namespaced: true,
  state: {
    username: getLocalStorage('username') || '',
    token: getLocalStorage('token') || ''
  },
  getters: {
    userInfo(state) {
      return {
        token: state.token,
        useranme: state.useranme,
        avatar: state.avatar,
      };
    },
    isLogin(state) {
      // eslint-disable-next-line eqeqeq
      return state.token != '';
    },
  },
  mutations: {
    [types.SET_TOKEN](state, token) {
      console.log(1)
      state.token = token;
    }
  },
  actions: {
    async login() {
      // 用户授权登录
      let tokenInfo = null
      try {
        tokenInfo = await auth({
          clientId: 'QFghMGtuIwt2ayJKg434',
          clientSecret: 'JMVfrgW5u94GbAqnR6Ah4Ptw7cSUOJaAVGkLDO8C',
          scope: 'repo,doc,group,artboard',
        })
        if (tokenInfo) {
          setLocalStorage('token', tokenInfo.access_token)
          // 刷新页面
          refreshMainWindow();
        }
      } catch (error) {

      }
    }
  }
};
