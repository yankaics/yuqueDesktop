<template>
  <div :class="$style.wrap">
    <el-button-group>
      <el-button :type="isUserMode ? 'primary' : ''" size="small" round @click="changeMode(true)">个人
      </el-button>
      <el-button :type="isUserMode ? '' : 'primary'" size="small" round @click="changeMode(false)">
        团队</el-button>
    </el-button-group>
  </div>

</template>

<script>
import { createNamespacedHelpers } from "vuex";
// vuex
import { types } from "store/modules/Info";
const { SET_IS_USER_MODE } = types;
const { mapState: infoState, mapMutations: infoMutations } = createNamespacedHelpers("Info/");

export default {
  name: 'SelectGroup',
  components: {

  },
  data() {
    return {

    };
  },
  computed: {
    ...infoState(['isUserMode'])
  },
  mounted(){
    // console.log(this.isUserMode)
  },
  methods: {
    ...infoMutations([SET_IS_USER_MODE]),
    changeMode(val) {
      this.SET_IS_USER_MODE(val);
    }
  },
}
</script>

<style lang='scss' module>
.wrap {
  margin-left: 5px;
}
</style>