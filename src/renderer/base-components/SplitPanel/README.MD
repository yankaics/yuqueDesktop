# SplitPanel

  可以拖动的左右分栏容器组件

## 示例

```html
<template>
  <div :class="$style.splitPanelCon">
    <SplitPanel v-model="offset" :triggerWidth="3">
      <div slot="left" :class="$style.contentItem">left</div>
      <div slot="right" :class="$style.contentItem">right</div>
    </SplitPanel>
  </div>
</template>
<script>
import SplitPanel from 'base-components/SplitPanel'
export default {
  name: 'ContentPanel',
  components: {
    SplitPanel
  },
  data() {
    return {
      offset: 0.2
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" modules>
.splitPanelCon {
  width: 100%;
  height: 100%;
  background: papayawhip;
  .contentItem {
    height: 100%;
    line-height: 100%;
    color: white;
    font-size: 20px;
  }
}
</style>
```

## slot
| 名字     | 说明     |
| ------- | -------- |
| left    | 内容      |
| right   | 内容      |

## props
| 名字          | 类型     | 可选  | 缺省    | 说明                          |
| ------------ | -------  | ---- | ------ |-----                          |
| value        | Number   |      | 0.5    | 左div的宽度比例,右div的left比例  |
| triggerWidth | Number   |      | 1      | 分割线的宽度
| min          | Number   |      | 0.1    | 左边div的最小宽度
| max          | Number   |      | 0.9    | 左边div的最大宽度
| leftVisible  | Boolean  |      | true   | 是否显示左侧边栏
| rightVisible | Boolean  |      | true   | 是否显示右侧边栏


## event
