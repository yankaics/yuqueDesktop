<template>
  <ul :class="$style.wrap">
    <li v-for="doc in shouldDocList" :key="doc.slug"
      :class="[$style.docItem, $style.docListMode,  doc.slug === docID && $style.active]"
      @click="handleDocClick(doc.slug)">
      <span :class="$style.text" :title="doc.title">{{doc.title}}</span>
      <span :class="$style.time">{{doc.created_at}}</span>
    </li>
    <!-- <li :class="$style.docSummaryMode">docSummaryMode</li> -->
  </ul>
</template>

<script>
import moment from "moment";
// api
import { fetchGetDocs } from "@/api";

// vuex
import { createNamespacedHelpers } from "vuex";
import { types } from "store/modules/Info";
const { mapState: infoState, mapMutations: infoMutations } = createNamespacedHelpers("Info/");
const { SET_DOC_ID } = types

export default {
  name: 'DocList',
  components: {

  },
  data() {
    return {
      docList: []
    };
  },
  computed: {
    ...infoState(['groupID', 'reopID', 'reopOpts', 'docID']),
    shouldDocList() {
      return this.docList;
    }
  },
  mounted() {
    // this.loadData();
  },
  watch: {
    async reopID(val) {
      if (val) {
        this.docList = await this.loadDocs(this.groupID, this.reopID);
      } else {
        this.docList = [];
      }
    },
    // reopOpts: {
    //   showMode() {
    //     console.log('showMode')
    //   },
    //   sortMode() {
    //     console.log('sortMode')
    //   },
    //   deep: true
    // }
  },
  methods: {
    ...infoMutations([SET_DOC_ID]),
    async loadDocs(groupID, reopID) { // 读取文档列表
      let resp = await fetchGetDocs(groupID, reopID);
      const { data } = resp.data;
      if (!data) return [];
      const result = data.map(item => {
        const { description, slug, title, created_at, content_updated_at, status } = item;
        return {
          description, slug, title, status,
          created_at: moment(created_at).format('YYYY-MM-DD'),
          content_updated_at: moment(content_updated_at).format('YYYY-MM-DD'),
        }
      })
      return result;
    },
    handleDocClick(docID) {
      this.SET_DOC_ID(docID);
    }
  },
}
</script>

<style lang='scss' module>
.wrap {
}
.docItem {
  user-select: none;
  cursor: default;
}
.docListMode {
  display: flex;
  align-items: center;
  height: 25px;
  border-bottom: 1px solid #e0e1e5;
  font-size: 13px;
  padding: 13px 15px;
  display: flex;
  justify-content: space-between;
  .text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .time {
    font-size: 12px;
    color: #888888;
    width: 80px;
    text-align: right;
  }
}
.active {
  background: #f5f6f8;
}
</style>