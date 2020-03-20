<template>
  <div :class="$style.wrap">
    <el-button-group>
      <el-button type="primary" size="small" round>个人</el-button>
      <el-button type="primary" size="small" round>团队</el-button>
    </el-button-group>
  </div>

</template>

<script>
export default {
  name: 'SelectGroup',
  components: {

  },
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {

  },
}
</script>

<style lang='scss' module>
.wrap {
  margin-left: 5px;
}
</style>