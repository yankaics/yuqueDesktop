// import getAppData from 'helper/getAppData';

// const userInfo = getAppData('userInfo', {});
import { setLocalStorage, getLocalStorage } from "helper/getAppData";
import { refreshMainWindow } from "helper/ui/win";
// import auth from "helper/auth";

export const types = {
  SET_USER_ID: 'SET_USER_ID',
  SET_GROUP_ID: 'SET_GROUP_ID',
  SET_REOP_ID: 'SET_REOP_ID',
  SET_REOP_NAME: 'SET_REOP_NAME',
  SET_DOC_ID: 'SET_DOC_ID',
  SET_IS_USER_MODE: 'SET_IS_USER_MODE',
  SET_USER_AVATAR: 'SET_USER_AVATAR',
  CLEAR_DOC_ARGS: 'CLEAR_DOC_ARGS',
  SET_SHOW_MODE: 'SET_SHOW_MODE',
  SET_SORT_MODE: 'SET_SORT_MODE',
  SET_SORT_DESC: 'SET_SORT_DESC',
}

/** 文档列表选项 */
export const reopOptsTypes = {
  /** 列表模式 */
  SHOW_LIST: 'SHOW_LIST',
  /** 摘要模式 */
  SHOW_SUMMARY: 'SHOW_SUMMARY',
  /** 创建时间排序 */
  SORT_CREATE_TIME: 'SORT_CREATE_TIME',
  /** 修改时间排序 */
  SORT_UPDATE_TIME: 'SORT_UPDATE_TIME',
  /** 文件名称排序 */
  SORT_FILE_NAME: 'SORT_FILE_NAME'
}

const yuqueURLBase = 'https://www.yuque.com/';

export default {
  namespaced: true,
  state: {
    userAvatar: '',
    userID: '',
    groupID: '',
    reopID: '',
    reopName: '',
    docID: '',
    reopOpts: {
      showMode: reopOptsTypes.SHOW_SUMMARY,
      sortMode: reopOptsTypes.SORT_CREATE_TIME,
      sortDesc: true, // 降序，从大到小
    },
    isUserMode: true
  },
  getters: {
    /** 获取文档URL */
    docUrl({ state, getters }) {
      // const { userName, reopName, groupName, docName, isUserMode } = state
      // if (docName) {
      //   const groupOrUser = isUserMode ? userName : groupName;
      //   return `${yuqueURLBase}${groupOrUser}/${reopName}/${docName}`;
      // }
      return '';
    },
  },
  mutations: {
    [types.SET_USER_AVATAR](state, userAvatar) {
      state.userAvatar = userAvatar;
    },
    [types.SET_USER_ID](state, userID) {
      state.userID = userID;
    },
    [types.SET_GROUP_ID](state, groupID) {
      state.groupID = groupID;
    },
    [types.SET_REOP_ID](state, reopID) {
      state.reopID = reopID;
    },
    [types.SET_REOP_NAME](state, reopName) {
      state.reopName = reopName;
      state.docID = '';
    },
    [types.SET_DOC_ID](state, docID) {
      state.docID = docID;
    },
    [types.SET_IS_USER_MODE](state, isUserMode) {
      state.isUserMode = isUserMode;
    },
    [types.CLEAR_DOC_ARGS](state) {
      state.groupID = '';
      state.reopID = '';
      state.docID = '';
      state.reopName = '';
    },
    [types.SET_SHOW_MODE](state, showMode) {
      state.reopOpts.showMode = showMode;
    },
    [types.SET_SORT_MODE](state, sortMode) {
      state.reopOpts.sortMode = sortMode;
    },
    [types.SET_SORT_DESC](state, sortDesc) {
      state.reopOpts.sortDesc = sortDesc;
    },
  },
  actions: {

  }
};
