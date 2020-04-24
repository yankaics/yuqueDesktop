<template>
  <div :class="$style.wrap">
    <img :src="img(LayoutType.FULL)" @click="changeType(LayoutType.FULL)"><img
      :src="img(LayoutType.FILE)" @click="changeType(LayoutType.FILE)"><img
      :src="img(LayoutType.DOC)" @click="changeType(LayoutType.DOC)">
  </div>
</template>

<script>
import { LayoutType, types as uiTypes } from "store/modules/UI";
import { createNamespacedHelpers } from "vuex";

const {
  mapState: uiState,
  mapMutations: uiMutations
} = createNamespacedHelpers("UI/");

const { SET_LAYOUT_TYPE } = uiTypes;


export default {
  name: 'LayoutTool',
  components: {

  },
  data() {
    return {
      LayoutType
    };
  },
  computed: {
    ...uiState(['curLayoutType']),
  },
  methods: {
    ...uiMutations([SET_LAYOUT_TYPE]),
    img(type) {
      let state = type === this.curLayoutType ? '_2' : ''
      return `static/img/layout${type}${state}.png`
    },
    changeType(type) {
      this.SET_LAYOUT_TYPE(type)
    }
  }
}
</script>

<style lang='scss' module>
.wrap {
  padding-top: 3px;
  margin-left: 20px;
  img {
    height: 25px;
  }
}
</style>