<template>
  <div :class="$style.avatar">
    <img v-if="userAvatar" :src="userAvatar" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const {
  mapState: infoState,
} = createNamespacedHelpers("Info/");

export default {
  name: 'User',
  components: {

  },
  data() {
    return {

    };
  },
  computed: {
    ...infoState(['userAvatar'])
  },
}
</script>

<style lang='scss' module>
.avatar {
  // position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background: white;
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid #ccc;
    background: white;
  }
}
</style>