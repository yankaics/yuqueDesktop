// import { setLocalStorage, getLocalStorage } from "helper/getAppData";
// import { refreshMainWindow } from "helper/ui/win";
// import auth from "helper/auth";
// import { now } from "moment";

// export const types = {
//   SET_TOKEN: 'SET_TOKEN',
// }

export const types = {
  SET_LAYOUT_TYPE: 'SET_LAYOUT_TYPE'
}

export const LayoutType = {
  FULL: 'Full',
  FILE: 'File',
  DOC: 'Doc'
}



export default {
  namespaced: true,
  state: {
    curLayoutType: LayoutType.FULL,
    // token: getLocalStorage('token') || '',
  },
  getters: {
    // userInfo(state) {
    //   return {
    //     token: state.token,
    //     useranme: state.useranme,
    //   };
    // },

    // isLogin(state) {
    //   return state.token !== '';
    // },
  },
  mutations: {
    [types.SET_LAYOUT_TYPE](state, layoutType) {
      state.curLayoutType = layoutType;
    },
    //   [types.SET_TOKEN](state, token) {
    //     state.token = token;
    //   },
  },
  actions: {
    // async getToken({ commit }) {
    //   // 用户授权登录
    //   let tokenInfo = null
    //   try {
    //     tokenInfo = await auth({
    //       clientId: 'QFghMGtuIwt2ayJKg434',
    //       clientSecret: 'JMVfrgW5u94GbAqnR6Ah4Ptw7cSUOJaAVGkLDO8C',
    //       scope: 'repo,doc,group,artboard',
    //     })
    //     if (tokenInfo) {
    //       console.log('1111111111')
    //       // 把token存到本地存储中，供下次打开应用时读取
    //       setLocalStorage('token', tokenInfo.access_token)
    //       setLocalStorage('tokenTime', now())
    //       commit(types.SET_TOKEN, tokenInfo.access_token)
    //       // 刷新页面
    //       refreshMainWindow();
    //     }
    //   } catch (error) {

    //   }
    // }
  }
};
