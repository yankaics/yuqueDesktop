import moment from "moment";
import { fetchGetUserRepos, fetchGetGroups, fetchGetGroupRepos, fetchGetDocs, fetchGetDocInfo } from "@/api";
import { msgWarn } from "helper/ui/dialog";

import DataStore from "modules/DataStore";
const docsDB = DataStore.docs;

const __DEV__ = process.env.NODE_ENV === 'development';

// 1、文档结构Diff
// 2、更新文档内容
// 3、读取远端文档列表

/**
 * 比对接口与数据库的文档差异
 * @param {*} context 
 */
export async function diffDocs(context) {
  let newDocs = [];
  newDocs = await loadDocList(context);
  // await docsDB.remove({}, { multi: true });
  console.log('接口中获取的文档列表', newDocs)
  // -----  对比本地数据库  -----
  // 远端无数据，删除本地的数据
  if (newDocs.length === 0) {
    await docsDB.remove();
    return;
  }


  // 本地无数据，直接增加到本地
  const oldDocsCount = await docsDB.count()
  if (oldDocsCount === 0) {
    let shouldDoc = newDocs.map(({ updated_at, id, slug, user_id, content_updated_at, repo_id }) => ({
      updated_at, _id: id, slug, user_id, content_updated_at, repo_id
    }))

    for (let i = 0; i < shouldDoc.length; i++) {
      const doc = shouldDoc[i];
      const docInfo = await loadDocInfo(doc.user_id, doc.repo_id, doc.slug);
      doc.body_html = docInfo.body_html;
      doc.title = docInfo.title;
    }
    await docsDB.insert(shouldDoc)
    return;
  }
  // 格式化远端文档列表数据
  let remoteDocsMap = {}
  remoteDocsMap = newDocs.reduce((obj, doc) => {
    const { updated_at, id, slug, user_id, content_updated_at, repo_id } = doc;
    obj[doc.id] = { updated_at, _id: id, slug, user_id, content_updated_at, repo_id }
    return obj;
  }, {})

  // let remoteDocsMap = newDocs.map(({ updated_at, id, slug, user_id, content_updated_at }) => ({
  //   updated_at, _id: id, slug, user_id, content_updated_at
  // }))
  // console.log('处理过的远端Map', Object.keys(remoteDocsMap).length, remoteDocsMap)

  // Diff
  let localDocs = await docsDB.find()
  console.log('数据库中获取的文档列表', localDocs)

  for (let i = 0; i < localDocs.length; i++) {
    const localDoc = localDocs[i];
    const docID = localDoc._id;
    const remoteDoc = remoteDocsMap[docID]
    // 远端文档不存在，说明被删除。删除本地文档
    if (!remoteDoc) {
      console.log('远端不存在，删除本地文档')
      await docsDB.remove({ _id: docID });
      continue;
    }
    // 更新时间有差异，更新本地文档
    const isSame = moment(localDoc.updated_at).isSame(remoteDoc.updated_at);
    if (!isSame) {
      console.log('有差异')
      const { updated_at, _id, slug, user_id, content_updated_at, repo_id } = remoteDoc;
      const { body_html, title } = await loadDocInfo(user_id, repo_id, slug);
      await docsDB.update({ _id: docID }, { $set: { updated_at, slug, user_id, content_updated_at, repo_id, body_html, title } }, { multi: true })
    }
    // 删除已处理文档的键
    delete remoteDocsMap[docID];

  }

  // console.log('处理结束的远端Map', remoteDocsMap)
  // 将新文档追加到本地
  for (const key in remoteDocsMap) {
    console.log('远端存在，本地不存在，追加本地文档')
    if (remoteDocsMap.hasOwnProperty(key)) {
      const doc = remoteDocsMap[key];
      // TODO: 更新文档内容
      const docInfo = await loadDocInfo(doc.user_id, doc.repo_id, doc.slug);
      doc.body_html = docInfo.body_html;
      doc.title = docInfo.title;
      await docsDB.insert(doc)
    }
  }



}


/** 读取远端接口文档列表 */
async function loadDocList({ rootState }) {
  let groups = [];
  let repos = [];
  let docs = [];
  let data = null;
  let userID = rootState.Info.userID;

  // 获取个人库列表
  data = await fetchGetUserRepos(userID);
  if (!data) { msgWarn('同步失败'); return; }
  repos.push(...data.data.data);
  data = null;

  // 获取团队列表
  data = await fetchGetGroups(userID);
  if (!data) { msgWarn('同步失败'); return; }
  groups.push(...data.data.data);
  data = null;

  // 获取团队库列表
  for (const { id } of groups) {
    data = await fetchGetGroupRepos(id);
    if (!data) { msgWarn('同步失败'); return; }
    repos.push(...data.data.data);
    data = null;
  }
  // console.log(repos)

  // 获取个人、团队库文档列表
  for (const { slug, user_id } of repos) {
    data = await fetchGetDocs(user_id, slug);
    if (!data) { msgWarn('同步失败'); return; }
    // 增加repoID
    const docsData = data.data.data.map(item => ({
      ...item,
      user_id, // 这个user_id 即是userid 也是 groupid
      repo_id: slug
    }))
    docs.push(...docsData);
    data = null;
  }
  return Promise.resolve(docs);
}

/**
 * 从接口中读取文档信息
 * @param {*} userIDOrGroupID 
 * @param {*} repoID 
 * @param {*} docID 
 */
export async function loadDocInfo(userIDOrGroupID, repoID, docID) {
  const docInfo = await fetchGetDocInfo(userIDOrGroupID, repoID, docID)
  const { body_html, title } = docInfo.data.data;
  return {
    body_html, title
  }
}

export async function loadLocalDoc(userIDOrGroupID, repoID, docID) {
  const doc = await docsDB.findOne({ repo_id: repoID, slug: docID })
  return doc;
}