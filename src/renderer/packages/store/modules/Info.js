// import getAppData from 'helper/getAppData';

// const userInfo = getAppData('userInfo', {});
import { setLocalStorage, getLocalStorage } from "helper/getAppData";
import { refreshMainWindow } from "helper/ui/win";
// import auth from "helper/auth";

export const types = {
  SET_USER_NAME: 'SET_USER_NAME',
  SET_REOP_NAME: 'SET_REOP_NAME',
  SET_GROUP_NAME: 'SET_GROUP_NAME',
  SET_DOC_NAME: 'SET_DOC_NAME',
  SET_IS_USER_MODE: 'SET_IS_USER_MODE',
  SET_USER_AVATAR: 'SET_USER_AVATAR'
}

const yuqueURLBase = 'https://www.yuque.com/';

export default {
  namespaced: true,
  state: {
    userAvatar: '',
    userName: '',
    groupName: '',
    reopName: '',
    docName: '',
    isUserMode: true
  },
  getters: {
    /** 获取文档URL */
    docUrl({ state, getters }) {
      const { userName, reopName, groupName, docName, isUserMode } = state
      if (docName) {
        const groupOrUser = isUserMode ? userName : groupName;
        return `${yuqueURLBase}${groupOrUser}/${reopName}/${docName}`;
      }
      return '';
    },
  },
  mutations: {
    [types.SET_USER_AVATAR](state, userAvatar) {
      state.userAvatar = userAvatar;
    },
    [types.SET_USER_NAME](state, userName) {
      state.userName = userName;
    },
    [types.SET_REOP_NAME](state, reopName) {
      state.reopName = reopName;
    },
    [types.SET_GROUP_NAME](state, groupName) {
      state.groupName = groupName;
    },
    [types.SET_DOC_NAME](state, docName) {
      state.docName = docName;
    },
    [types.SET_IS_USER_MODE](state, isUserMode) {
      state.isUserMode = isUserMode;
    }
  },
  actions: {

  }
};
