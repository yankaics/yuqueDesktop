<template>
  <div :class="$style.wrap">
    <DocView v-if="!isEdit" :doc="localDoc" />
    <WebView :groupID="groupID" :reopID="reopID" :docID="docID" v-else />
  </div>
</template>

<script>
import { loadLocalDoc } from "modules/DocDiff";
import DocView from "./components/DocView";
import WebView from "./components/WebView";
import { createNamespacedHelpers } from "vuex";
const { mapState: infoState } = createNamespacedHelpers("Info/");

export default {
  name: 'DocArea',
  components: {
    DocView, WebView
  },
  data() {
    return {
      isEdit: false,
      localDoc: {}
    };
  },
  computed: {
    ...infoState(['groupID', 'reopID', 'docID']),
  },
  watch: {
    docID(val) {
      if (!val) {
        this.localDoc = {}
        return;
      }
      this.isEdit = false;
      this.loadDoc();
      // console.log(this.docUrl)
      // this.isLoading = true;
      // this.webview.loadURL(this.docUrl);
    }
  },
  mounted() {
    this.initBus();
    // if (!this.docID) return;
    // this.initWebview();
    // this.webview = this.$refs.webview;
    // this.webview.addEventListener('dom-ready', () => {
    //   console.log('加载完成')
    //   this.isLoading = false;
    //   // debug after del

    //   const editCss = `

    //     `
    //   this.webview.insertCSS(editCss)
    //   this.webview.openDevTools()

    // })
  },
  methods: {
    async loadDoc() {
      const docInfo = await loadLocalDoc(this.groupID, this.reopID, this.docID)
      this.localDoc = docInfo;
    },
    initBus() {
      this.$on('changeEdit', () => {
        console.log('changeEdit')
        this.isEdit = !this.isEdit;
      })
    }
  },
}
</script>

<style lang='scss' module>
.wrap {
  height: 100%;
  width: 100%;
  position: relative;
}

</style>