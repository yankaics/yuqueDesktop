import axios from 'helper/axios';

/** 读取用户信息 */
const fetchGetUserInfo = () => axios.get('/user');

/** 读取用户信息 */
export async function GetUserInfo() {
  let resp;
  try {
    resp = await fetchGetUserInfo();
  } catch (err) {
    return;
  }
  const { data } = resp.data;
  if (!data) return;
  return data;
}

/** 获取个人库列表，根据用户名/用户id  */
export const fetchGetUserRepos = (userID) => axios.get(`/users/${userID}/repos`);

/** 获取团队列表，根据用户名/用户id */
export const fetchGetGroups = (userID) => axios.get(`/users/${userID}/groups`);
/** 获取团队库列表，根据团队名/团队id */
export const fetchGetGroupRepos = (groupID) => axios.get(`/groups/${groupID}/repos`);

/** 获取文档列表，根据 用户名/团队名 ; 仓库名 */
export const fetchGetDocs = (userIDOrGroupID, repoID) => axios.get(`/repos/${userIDOrGroupID}/${repoID}/docs`)

/** 获取单篇文档的详细信息 */
export const fetchGetDocInfo = (userIDOrGroupID, repoID, docID) => axios.get(`/repos/${userIDOrGroupID}/${repoID}/docs/${docID}`)