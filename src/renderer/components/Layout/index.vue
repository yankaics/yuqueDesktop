<template>
  <div :class="$style.splitPanelCon">
    <SplitPanel :width="200" :max="300" :leftVisible="groupListVisible"
      :rightVisible="rightVisible">
      <div slot="left" :class="$style.contentItem">
        <GroupList />
        <!-- <button @click="groupListVisible=!groupListVisible">隐藏左</button><button
          @click="rightVisible=!rightVisible">隐藏右</button>Left1 -->

      </div>
      <div slot="right" :class="$style.contentItem">

        <SplitPanel :width="200" :min="200" :max="-200" :leftVisible="docListVisible"
          :rightVisible="docVisible">

          <div slot="left" :class="$style.contentItem">
            <!-- <button @click="listVisible=!listVisible">隐藏左</button><button
              @click="docVisible=!docVisible">隐藏右</button>Left2 -->
          </div>
          <div slot="right" :class="$style.contentItem">
            <!-- <button @click="listVisible=!listVisible">隐藏左</button><button
              @click="docVisible=!docVisible">隐藏右</button>Right2 -->
          </div>

        </SplitPanel>
      </div>
    </SplitPanel>
  </div>
</template>
<script>
import SplitPanel from 'base-components/SplitPanel'
import GroupList from "components/GroupList";

export default {
  name: 'layout',
  components: {
    SplitPanel, GroupList
  },
  data() {
    return {
      groupListVisible: true,
      docListVisible: true,
      docVisible: true,
      rightVisible: true
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
  // height: 100%;
  // background: papayawhip;
  .contentItem {
    height: 100%;
    line-height: 100%;
    color: black;
    font-size: 20px;
  }
}
</style>



