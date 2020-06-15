<template>
  <ul :class="$style.wrap">
    <li v-for="doc in shouldDocList" :key="doc.slug"
      :class="[$style.docItem, showMode === reopOptsTypes.SHOW_LIST && $style.docListMode,showMode === reopOptsTypes.SHOW_SUMMARY && $style.docSummaryMode,  doc.slug === docID && $style.active]"
      @click="handleDocClick(doc.slug)" @dblclick="onDbClickDoc(groupID, reopID, doc.slug)">
      <div :class="$style.text" :title="doc.title">{{doc.title}}</div>
      <div :class="$style.desc" v-show="showMode === reopOptsTypes.SHOW_SUMMARY && doc.description">
        {{doc.description}}
      </div>
      <div :class="$style.time">{{doc.created_at}}</div>
    </li>
    <!-- <li :class="$style.docSummaryMode">docSummaryMode</li> -->
  </ul>
</template>

<script>
import moment from "moment";
// api
import { fetchGetDocs } from "@/api";
import { openNewWin } from "helper/ui/win";

// vuex
import { createNamespacedHelpers } from "vuex";
import { reopOptsTypes, types } from "store/modules/Info";
const { mapState: infoState, mapMutations: infoMutations } = createNamespacedHelpers("Info/");
const { SET_DOC_ID } = types
const { SHOW_LIST, SHOW_SUMMARY, SORT_CREATE_TIME, SORT_UPDATE_TIME, SORT_FILE_NAME } = reopOptsTypes

export default {
  name: 'DocList',
  components: {

  },
  data() {
    return {
      docList: [],
      reopOptsTypes
    };
  },
  computed: {
    ...infoState(['groupID', 'reopID', 'reopOpts', 'docID']),
    shouldDocList() {
      const sort = (sortField) => {
        if (this.sortDesc) {
          this.docList.sort((a, b) => a[sortField] < b[sortField] ? 1 : -1);
        }
        else {
          this.docList.sort((a, b) => a[sortField] > b[sortField] ? 1 : -1);
        }
      }
      if (this.sortMode === SORT_CREATE_TIME) {
        sort('created_at');
      } else if (this.sortMode === SORT_UPDATE_TIME) {
        sort('content_updated_at');
      } else if (this.sortMode === SORT_FILE_NAME) {
        sort('title');
      }
      return this.docList;
    },
    showMode() {
      return this.reopOpts.showMode;
    },
    sortMode() {
      return this.reopOpts.sortMode;
    },
    sortDesc() {
      return this.reopOpts.sortDesc;
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
    },
    onDbClickDoc(groupID, repoID, docID) {
      console.log(groupID, repoID, docID)
      openNewWin(`https://www.yuque.com/${this.groupID}/${this.reopID}/${this.docID}`)
      // 打开新窗口
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
  padding: 13px 15px;
  display: flex;
  justify-content: space-between;
  .text {
    font-size: 13px;
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
.docSummaryMode {
  padding: 13px 15px;
  border-bottom: 1px solid #e0e1e5;
  .text {
    font-size: 13px;
  }
  .desc {
    font-size: 12px;
    color: #676566;
    margin-top: 8px;
    // width: 100%;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .time {
    font-size: 12px;
    color: #888888;
    margin-top: 8px;
  }
}
.active {
  background: #f5f6f8;
}
</style>