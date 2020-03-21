<template>
  <div :class="$style.wrap" v-loading="isLoading" element-loading-text="拼命加载中">
    <webview v-show="!isLoading" ref="webview" id="foo"
      src="https://www.yuque.com/gdd3w4/rbpigd/tv2ixl/edit" :class="$style.webview"></webview>
    <!-- <div :class="$style.loadingWrap">

    </div> -->
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState: infoState } = createNamespacedHelpers("Info/");

export default {
  name: 'DocArea',
  components: {

  },
  data() {
    return {
      webview: null,
      isLoading: false,
    };
  },
  computed: {
    ...infoState(['groupID', 'reopID', 'docID']),
    docUrl() {
      if (this.docID) {
        return `https://www.yuque.com/${this.groupID}/${this.reopID}/${this.docID}/edit`
      } else {
        return 'about:blank'
      }
    },
  },
  watch: {
    docID(val) {
      // console.log(this.docUrl)
      this.isLoading = true;
      this.webview.loadURL(this.docUrl);
      if (val) {
        this.$nextTick(() => {
          this.insertCSS();
        })
      } else {

      }
    }
  },
  mounted() {
    // if (!this.docID) return;
    this.webview = this.$refs.webview;
    this.webview.addEventListener('dom-ready', () => {
      console.log('加载完成')
      this.isLoading = false;
      // debug after del

      const editCss = `
          .lake-content-editor { margin: 0!important; }
        
        
        `
      this.webview.insertCSS(editCss)
      this.webview.openDevTools()

    })
  },
  methods: {
    insertCSS() {
      this.webview = this.$refs.webview;
      this.webview.addEventListener('dom-ready', () => {
        const viewCss = `
          .comment___1P9VX { display: none; }
          .footer { display: none; }
          .entry___P-H5Q { display: none; }
          .entry___odTWc { display: none; }
          .wrapper___8HhiZ { display: none!important; }
          .header-crumb { padding:0; }
          .lark-breadcrumb-logo { display: none; }
          .header-action { display: flex!important; }
          .wrapper___2FZde { box-shadow: 0 0 0 0!important; border-bottom: 1px solid #e1e0e5; height: 61px!important; }
        `
        const editCss = `
          .lake-content-editor { margin: 0; }
        
        
        `
        this.webview.insertCSS(editCss)
        this.webview.openDevTools()
        // console.log(webview.getURL())
        // console.dir(webview)
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
  :global(.el-loading-mask) {
    left: 1px;
  }
}
.webview {
  height: 100%;
  width: 100%;
}
.loadingWrap {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 2;
}
</style>