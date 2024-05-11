<script lang="ts">
export default {
  name: 'BaseAuth',
  created() {
    // 检查当前地址是否不含二级地址
    if (this.$route.path === '/auth') {
      this.$router.replace({name: 'AuthLogin'});
    }
  }
}
</script>

<template>
  <div id="background-image" class="flex justify-items-center items-center">
    <div
        class="relative block overflow-hidden rounded-lg m-3 p-4 sm:p-6 lg:p-8 bg-white shadow-2xl w-full md:w-[600px]"
    >
      <span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>
#background-image {
  background-image: url("@/assets/images/background.webp");
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center; /* 将图片居中显示 */
  background-size: cover; /* 拉伸图片以完全覆盖容器 */
}
</style>
