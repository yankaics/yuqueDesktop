<template>
  <div :class="$style.splitPanelCon">
    <SplitPanel :width="270" :min="270" :max="-400" :leftVisible="groupListVisible"
      :rightVisible="rightVisible">
      <div slot="left" :class="$style.contentItem">
        <GroupArea />
        <!-- <button @click="groupListVisible=!groupListVisible">隐藏左</button><button
          @click="rightVisible=!rightVisible">隐藏右</button>Left1 -->

      </div>
      <div slot="right" :class="$style.contentItem">

        <SplitPanel :width="250" :min="200" :max="-200" :leftVisible="docListVisible"
          :rightVisible="docVisible">

          <div slot="left" :class="$style.contentItem">
            <!-- <button @click="listVisible=!listVisible">隐藏左</button><button
              @click="docVisible=!docVisible">隐藏右</button>Left2 -->
            <ReopArea />
          </div>
          <div slot="right" :class="$style.contentItem">
            <!-- <button @click="listVisible=!listVisible">隐藏左</button><button
              @click="docVisible=!docVisible">隐藏右</button>Right2 -->
            <DocArea />
          </div>

        </SplitPanel>
      </div>
    </SplitPanel>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import SplitPanel from 'base-components/SplitPanel'
import GroupArea from "components/GroupArea";
import ReopArea from "components/ReopArea";
import DocArea from "components/DocArea";

import { LayoutType } from "store/modules/UI";
const { mapState: uiState } = createNamespacedHelpers("UI/");

export default {
  name: 'layout',
  components: {
    SplitPanel, GroupArea, ReopArea, DocArea
  },
  data() {
    return {
      groupListVisible: true,
      docListVisible: true,
      docVisible: true,
      rightVisible: true
    }
  },
  computed: {
    ...uiState(["curLayoutType"]),
  },
  watch: {
    curLayoutType(val) {
      // 控制界面布局
      if (val === LayoutType.FULL) {
        this.groupListVisible = true;
        this.docListVisible = true;
        this.docVisible = true;
        this.rightVisible = true;
      } else if (val === LayoutType.FILE) {
        this.groupListVisible = false;
        this.docListVisible = true;
        this.docVisible = true;
        this.rightVisible = true;
      } else if (val === LayoutType.DOC) {
        this.groupListVisible = false;
        this.docListVisible = false;
        this.docVisible = true;
        this.rightVisible = true;
      }
    }
  },
  methods: {
    aaa() {
      this.leftVisible = !this.leftVisible;
    },
    bbb() {
      this.rightVisible = !this.rightVisible;
    }
  }
}
</script>
<style lang="scss" module>
.splitPanelCon {
  flex: 1;
  width: 100%;
  height: calc(100% - 60px);
  // background: papayawhip;
  .contentItem {
    height: 100%;
    line-height: 100%;
    color: black;
    font-size: 20px;
  }
}
</style>



