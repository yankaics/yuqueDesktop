<template>
  <div>
    <router-link :to="{ name: 'Home'}">User</router-link>
    <button @click="aaa">调用接口测试</button>
  </div>
</template>

<script>
import { GetUserInfo } from "./api";
export default {
  name: 'Login',
  components: {

  },
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {
    async aaa() {
      let a = await GetUserInfo();
    }
  },
}
</script>

<style lang='scss' module>
</style>