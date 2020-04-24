<template>
  <div :class="$style.wrap">
    <!-- <p>userID -{{userID}}</p>
    <p>groupID -{{groupID}}</p>
    <p>reopID -{{reopID}}</p>
    <p>docID -{{docID}}</p> -->
    <el-tree ref="tree" :data="dataList" :props="defaultProps" node-key="id"
      @node-click="handleNodeClick" highlight-current :default-expanded-keys="defaultExpandNode"
      :expand-on-click-node="false">
      <span slot-scope="{ node, data }" :class="$style.node">
        <i :class="data.icon"></i>
        <span style="padding-left: 4px;">{{node.label}}</span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
// api
import { fetchGetUserRepos, fetchGetGroups, fetchGetGroupRepos } from "@/api";
import { types } from "store/modules/Info";
const { mapState: infoState, mapMutations: infoMutations } = createNamespacedHelpers("Info/");
const { CLEAR_DOC_ARGS, SET_GROUP_ID, SET_REOP_ID, SET_REOP_NAME } = types;

const nodeType = {
  repo: 'repo',
  group: 'group'
}

export default {
  name: 'GroupList',
  components: {

  },
  data() {
    return {
      dataList: [],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      beforeSelectRepoKey:'',
    };
  },
  computed: {
    ...infoState(['isUserMode', 'userID', 'groupID', 'reopID', 'docID']),
    defaultExpandNode() {
      return this.dataList.map(item => item.id);
    }
  },
  mounted() {

  },
  watch: {
    userID() {
      // 首次打开时触发，防止异步userID读取不到
      this.loadRepoList();
    },
    isUserMode() {
      // 变更 个人团队类型时触发
      this.loadRepoList();
    }
  },
  methods: {
    ...infoMutations([CLEAR_DOC_ARGS, SET_GROUP_ID, SET_REOP_ID, SET_REOP_NAME]),
    async loadRepoList() { // 加载仓库列表
      if (this.isUserMode) {
        this.dataList = await this.loadUserRepoList(this.userID);
      } else {
        this.dataList = await this.loadGroupRepoList(this.userID);
        // await this.loadGroupRepoList(this.userID);
      }
      // 恢复之前选中的项
      if (this.reopID) {
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(this.reopID);
        })
      }
    },
    async loadUserRepoList(userID) { // 读取用户仓库列表
      // 获取个人列表
      let resp = await fetchGetUserRepos(userID);
      const { data } = resp.data;
      if (!data) return [];
      const formatData = data.map(item => {
        return {
          label: item.name,
          id: item.slug,
          type: nodeType.repo,
          icon: 'el-icon-notebook-2'
        }
      })
      let result = [
        {
          label: '个人知识库',
          id: userID,
          type: nodeType.group,
          icon: 'el-icon-collection',
          disabled: true,
          children: [
            ...formatData
          ]
        },

      ]
      return result;
    },

    async loadGroupRepoList(userID) { // 读取团队仓库列表
      let resp = await fetchGetGroups(userID);
      let { data } = resp.data;
      if (!data) return [];
      let result = data.map(item => {
        return {
          label: item.name,
          id: item.login,
          type: nodeType.group,
          icon: 'el-icon-collection',
          disabled: true,
        }
      });
      for (const group of result) {
        resp = await fetchGetGroupRepos(group.id)
        let { data } = resp.data;
        let repos = data.map(item => {
          return {
            label: item.name,
            id: item.slug,
            type: nodeType.repo,
            icon: 'el-icon-notebook-2',
            disabled: true,
          }
        })
        group.children = [
          ...repos
        ]
      }

      return result
    },

    handleNodeClick(data, node, component) {
      const { id, type, label } = data;
      if (type === nodeType.group) {
        // 选中团队分类，恢复成之前的项
        this.$refs.tree.setCurrentKey(this.beforeSelectRepoKey);
        component.$el.blur();
        return;
      }
      else if (type === nodeType.repo) {
        let groupID = node.parent.data.id;
        let reopID = id;
        let reopName = label;
        this.SET_GROUP_ID(groupID);
        this.SET_REOP_ID(reopID);
        this.SET_REOP_NAME(reopName);
        this.beforeSelectRepoKey = reopID;
      }
    },

  },
}
</script>

<style lang='scss' module>
.wrap {
}
.node {
  font-size: 14px;
}
</style>