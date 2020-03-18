<template>
  <div :class="$style.avatar">
    <img v-if="avatar" :src="avatar">
  </div>
</template>

<script>
import { GetUserInfo } from "../api";
export default {
  name: 'User',
  components: {

  },
  data() {
    return {
      avatar: '',
      username: ''
    };
  },
  mounted() {
    this.getUserInfo();

  },
  computed: {

  },
  methods: {
    async getUserInfo() {
      let data = await GetUserInfo();
      let { avatar_url, login } = data;
      this.avatar = avatar_url;
      this.username = login;
    }
  },
}
</script>

<style lang='scss' module>
.avatar {
  // position: relative;
  img {
    margin-left: 10px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid #ccc;
    background: white;
  }
}
</style>