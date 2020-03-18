<template>
  <div :class="$style.splitPaneWrapper" ref="outer">
    123
    <div v-show="leftVisible" :class="[$style.pane,$style.paneLeft]" :style="leftStyle">
      <slot name="left"></slot>
    </div>
    <div v-show="leftVisible && rightVisible" :class="$style.paneTriggerCon"
      @mousedown="handleMousedown" :style="splitStyle"></div>
    <div :class="[$style.pane, $style.paneRight]" :style="rightStyle">
      <slot name="right"></slot>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'SplitPanel',
  components: {

  },
  props: {
    value: { //右div的left比例||左div的宽度比例
      type: Number,
      default: 0.5
    },
    triggerWidth: { //风格线的宽度
      type: Number,
      default: 5
    },
    min: { //左边div的最小宽度
      type: Number,
      default: 0.1
    },
    max: { //左边div的最大宽度
      type: Number,
      default: 0.9
    },
    leftVisible: {
      type: Boolean,
      default: true
    },
    rightVisible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      historyLeftWidth: 0,
      historyRightWidth: 0,
    };
  },
  computed: {
    leftOffsetPercent() { //左边div的宽度
      return `${this.value * 100}%`
    },
    triggerLeft() { //分割线的left值为左边div的宽度减去自己宽度的一半，即分割线叠在左右div上
      return `calc(${this.value * 100}% - ${this.triggerWidth / 2}px)`
    },
    leftStyle() {
      let style = {}
      if (!this.leftVisible) {
        style.width = 0;
        style.paddingRight = 0;
      } else if (!this.rightVisible) {
        style.width = "100%";
        style.paddingRight = 0;
      } else {
        style.width = this.leftOffsetPercent;
        style.paddingRight = `${this.triggerWidth / 2}px`;
      }
      return style;
    },
    rightStyle() {
      let style = {}
      if (!this.leftVisible) {
        style.display = 'block';
        style.left = 0;
        style.paddingLeft = 0;
      } else if (!this.rightVisible) {
        style.display = 'none';
        style.paddingLeft = 0;
      } else {
        style.left = this.leftOffsetPercent;
        style.paddingLeft = `${this.triggerWidth / 2}px`
      }
      return style;
    },
    splitStyle() {
      return {
        left: this.triggerLeft,
        width: `${this.triggerWidth}px`
      }
    }
  },
  watch: {
    leftVisible(val) {
      if (!val) {

      }
    },
    rightVisible(val) {
      if (!val) {

      }
    }
  },
  methods: {
    handleMousedown(event) {
      //为document绑定事件，因为当鼠标位于组件外时，也要可以移动，所以事件应该是绑定在document上
      document.addEventListener('mousemove', this.handleMousemove)
      //鼠标放开时停止滚动
      document.addEventListener('mouseup', this.handleMouseup)
      this.initOffset = event.pageX - event.srcElement.getBoundingClientRect().left
      console.log(this.initOffset)
      this.canMove = true
    },
    handleMousemove(event) {
      if (!this.canMove) return
      const outerRect = this.$refs.outer.getBoundingClientRect()
      let offsetPercent = (event.pageX - this.initOffset + this.triggerWidth / 2 - outerRect.left) / outerRect.width
      if (offsetPercent < this.min) offsetPercent = this.min
      if (offsetPercent > this.max) offsetPercent = this.max
      console.log(offsetPercent);
      this.$emit('input', offsetPercent)
    },
    handleMouseup() {
      this.canMove = false
    }
  },
}
</script>

<style lang='scss' module>
// // ！为了使用 rem 单位每个vue组件都要导入 begin
// $page-width: 375;
// @import '~style/tool';
.splitPaneWrapper {
  height: 100%;
  width: 100%;
  position: relative;
  .pane {
    position: absolute;
    top: 0;
    height: 100%;
    // border-radius: 10px;
    background: white;
    &Left {
      // width: 30%;
      // background: palevioletred;
    }
    &Right {
      right: 0;
      bottom: 0;
      // background: paleturquoise;
    }
    &TriggerCon {
      height: 100%;
      background: #ccc;
      position: absolute;
      top: 0;
      z-index: 10;
      user-select: none;
      cursor: col-resize;
    }
  }
}
</style>