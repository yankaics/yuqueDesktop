<template>
  <div :class="$style.splitPaneWrapper" ref="outer">
    <div v-show="leftVisible" :class="[$style.paneLeft]" :style="leftStyle">
      <slot name="left"></slot>
      <div v-show="leftVisible && rightVisible" :class="$style.spliterWrap"
        @mousedown="handleMousedown" :style="spliterWrapStyle">
        <div :class="$style.line" :style="spliterLineStyle"></div>
      </div>
    </div>
    <div v-show="rightVisible" :class="[$style.paneRight]" :style="rightStyle" ref="rightRef">
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
    // value: { //右div的left比例||左div的宽度比例
    //   type: Number,
    //   default: 0.5
    // },
    spliterWidth: { //风格线的宽度
      type: Number,
      default: 1
    },
    width: { // 左边栏初始宽度
      type: Number,
      default: 300
    },
    min: { // 左边栏的最小宽度
      type: Number,
      default: 200
    },
    max: { // 左边栏的最大宽度，负数时，指定右边的最小宽度
      type: Number,
      default: -200
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
      // historyLeftWidth: 0,
      // historyRightWidth: 0,
      canMove: false,
      leftWidth: this.width,
      leftWidthOffest: 0,
      oldMouseX: 0,
    };
  },
  computed: {
    spliterWrapStyle() {
      return {
        right: `-${this.spliterWidth + 2}px`
      }
    },
    spliterLineStyle() {
      return {
        width: `${this.spliterWidth}px`
      }
    },
    leftStyle() {
      let style = {}
      if (this.min > 0) {
        style.minWidth = `${Math.abs(this.min)}px`;
      }
      if (this.max >= 0) {
        style.maxWidth = `${this.max}px`
      }
      if (this.max < 0 && this.$refs.outer) {
        let outerWidth = this.$refs.outer.clientWidth;
        style.maxWidth = `${outerWidth - Math.abs(this.max)}px`
        // console.log('css')
      }
      if (!this.rightVisible) {
        style.width = '100%';
      } else {
        style.width = `${this.leftWidth + this.leftWidthOffest}px`
      }

      return style;
    },
    rightStyle() {
      let style = {}
      console.log(this.$refs.outer && this.$refs.outer.clientWidth - this.$refs.outer.scrollWidth)
      if (this.max < 0) {
        style.minWidth = `${Math.abs(this.max)}px`;
      }
      // if (this.$refs.outer && this.$refs.outer.clientWidth - this.$refs.outer.scrollWidth < 0) {
      // const outerRect = this.$refs.outer.getBoundingClientRect()
      // console.log(1)
      // style.minWidth = `${this.$refs.rightRef.scrollWidth}px`

      // }
      return style;
    }

  },
  methods: {
    handleMousedown(event) {
      // console.log('MouseDown')
      //为document绑定事件，因为当鼠标位于组件外时，也要可以移动，所以事件应该是绑定在document上
      document.addEventListener('mousemove', this.handleMousemove)
      // //鼠标放开时停止滚动
      document.addEventListener('mouseup', this.handleMouseup)
      // console.log('盒子左侧', event.srcElement.getBoundingClientRect().left)
      this.oldMouseX = event.srcElement.getBoundingClientRect().left
      // console.log(event.pageX, event.srcElement.getBoundingClientRect().left)
      // this.initOffset = event.pageX - event.srcElement.getBoundingClientRect().left

      // console.log(this.initOffset)
      this.canMove = true
    },
    handleMousemove(event) {
      if (!this.canMove) return;
      const outerRect = this.$refs.outer.getBoundingClientRect()
      const rightRect = this.$refs.rightRef.getBoundingClientRect();
      // console.log(outerRect)
      // console.log(this.leftWidth)
      // console.log('pageX', event.pageX, 'oldMouseX', this.oldMouseX)
      const curMouseX = this.formatMousePoint(event.pageX)
      // let overRightOffset = 0; // 超过右栏的偏移
      // if (curMouseX > rightRect.left && this.$refs.outer.clientWidth - this.$refs.outer.scrollWidth < 0) {
      //   overRightOffset = curMouseX - rightRect.left;
      // }
      // console.log(overRightOffset)
      // 取到鼠标横向偏移量
      this.leftWidthOffest = curMouseX - this.oldMouseX;
      // console.log(this.leftWidthOffest)
      // console.log(this.leftWidthOffest)
      // if (this.leftWidthOffest < this.min) {
      //   this.leftWidthOffest = this.min
      // }
      // console.log(this.leftWidth + this.leftWidthOffest, this.max)
      // console.log(outerRect.width, this.leftWidth, this.leftWidthOffest)
      // console.log(this.$refs.outer.clientWidth - this.$refs.outer.scrollWidth)
      // console.log(this.$refs.outer.clientWidth - this.$refs.outer.scrollWidth)
      // console.log(this.$refs.outer.clientWidth - this.$refs.outer.scrollWidth)

      // if (this.$refs.outer.clientWidth - this.$refs.outer.scrollWidth < -2) {
      //   let oldRightWidth = outerRect.right - this.oldMouseX
      //   let newRightWidth = this.$refs.rightRef.scrollWidth;
      //   this.leftWidthOffest = oldRightWidth - newRightWidth
      // }
      // if (this.max < 0) {
      //   if ((outerRect.width - (this.leftWidth + this.leftWidthOffest)) < Math.abs(this.max)) {
      //     this.leftWidthOffest = outerRect.width - Math.abs(this.max) - this.leftWidth

      //   }
      // } else if (this.leftWidth + this.leftWidthOffest >= this.max) {
      //   this.leftWidthOffest = this.max - this.leftWidth;
      // }
      // if (this.leftWidth + this.leftWidthOffest < this.min) this.leftWidthOffest = this.min - this.leftWidth;

      // console.log(this.leftWidthOffest)
      // console.log(event.pageX - this.oldMouseX, this.leftWidth);
      // console.log(outerRect.left, outerRect.width)
      // let offsetPercent = (event.pageX - this.initOffset + this.triggerWidth / 2 - outerRect.left) / outerRect.width


      // console.log(offsetPercent);
      // this.$emit('input', offsetPercent)
    },
    formatMousePoint(x) {
      // 修复鼠标指针超出屏幕
      if (x > document.body.clientWidth) return document.body.clientWidth;
      else if (x < 0) return 0;
      else return x;
    },
    handleMouseup() {
      this.canMove = false;
      const outerRect = this.$refs.outer.getBoundingClientRect();
      const rightRect = this.$refs.rightRef.getBoundingClientRect();

      this.leftWidth = this.leftWidth + this.leftWidthOffest;
      if (this.leftWidth > outerRect.width - rightRect.width) {
        this.leftWidth = outerRect.width - rightRect.width;
      }
      if (this.leftWidth < this.min) {
        this.leftWidth = this.min;
      }
      this.leftWidthOffest = 0;
    }
  },
}
</script>

<style lang='scss' module>
.splitPaneWrapper {
  display: flex;
  height: 100%;
  .paneLeft {
    position: relative;
    // background-color: lightcoral;
  }
  .paneRight {
    flex: 1;
    // background-color: mediumaquamarine;
  }
  .spliterWrap {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 100;
    // padding: 0 10px;
    user-select: none;
    cursor: col-resize;
    .line {
      background-color: black;
      height: 100%;
      margin: 0 2px;
    }
  }
}
</style>