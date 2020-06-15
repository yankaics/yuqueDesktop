<template>
  <div :class="$style.wrap">
    <i class="el-icon-refresh" :class="[$style.syncBtn,{[$style.turn]:synchronizing}]" title="同步"
      @click="syncDoc" ref="syncBtn"></i>
    <div :class="$style.layout">
      <img :src="img(LayoutType.FULL)" @click="changeType(LayoutType.FULL)"><img
        :src="img(LayoutType.FILE)" @click="changeType(LayoutType.FILE)"><img
        :src="img(LayoutType.DOC)" @click="changeType(LayoutType.DOC)">
    </div>
  </div>
</template>

<script>
import { LayoutType, types as uiTypes } from "store/modules/UI";
import { types as syncTypes } from "store/modules/Sync";
import { createNamespacedHelpers } from "vuex";

const {
  mapState: uiState,
  mapMutations: uiMutations
} = createNamespacedHelpers("UI/");

const {
  mapState: syncState,
  mapActions: syncActions
} = createNamespacedHelpers("Sync/");

const { SET_LAYOUT_TYPE } = uiTypes;
const { SYNC_DOC } = syncTypes;


export default {
  name: 'Tools',
  components: {

  },
  data() {
    return {
      LayoutType
    };
  },
  computed: {
    ...uiState(['curLayoutType']),
    ...syncState(['synchronizing']),
  },
  methods: {
    ...uiMutations([SET_LAYOUT_TYPE]),
    ...syncActions([SYNC_DOC]),
    img(type) {
      let state = type === this.curLayoutType ? '_2' : ''
      return `static/img/layout${type}${state}.png`
    },
    changeType(type) {
      this.SET_LAYOUT_TYPE(type)
    },
    syncDoc(a, b, c) {
      this.SYNC_DOC();
      // const el = this.$refs.syncBtn;
      // syncBtn.addClass()
      // console.log(a, b, c)
    }
  }
}
</script>

<style lang='scss' module>
.wrap {
  display: flex;
  margin-left: 20px;
  .layout {
    margin-left: 10px;
    padding-top: 3px;
    img {
      height: 25px;
    }
  }
  .syncBtn {
    font-size: 20px;
    padding-top: 6px;
    &.turn {
      animation: turn 1s linear infinite;
    }
  }
  @keyframes turn {
    0% {
      -webkit-transform: rotate(0deg);
    }
    25% {
      -webkit-transform: rotate(-90deg);
    }
    50% {
      -webkit-transform: rotate(-180deg);
    }
    75% {
      -webkit-transform: rotate(-270deg);
    }
    100% {
      -webkit-transform: rotate(-360deg);
    }
  }
}
</style>