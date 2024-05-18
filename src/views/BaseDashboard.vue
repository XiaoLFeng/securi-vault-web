<!--
  - ********************************************************************************
  - Copyright (c) 2016-NOW(至今) 筱锋
  - Author: 筱锋(https://www.x-lf.com)
  -
  - 本文件包含 SecuriValue 的源代码，该项目的所有源代码均遵循MIT开源许可证协议。
  - 本代码仅进行 Java 大作业提交，个人发行版本计划使用 Go 语言重构。
  - ********************************************************************************
  - 许可证声明：
  -
  - 版权所有 (c) 2016-2024 筱锋。保留所有权利。
  -
  - 本软件是“按原样”提供的，没有任何形式的明示或暗示的保证，包括但不限于
  - 对适销性、特定用途的适用性和非侵权性的暗示保证。在任何情况下，
  - 作者或版权持有人均不承担因软件或软件的使用或其他交易而产生的、
  - 由此引起的或以任何方式与此软件有关的任何索赔、损害或其他责任。
  -
  - 由于作者需要进行 Java 大作业提交，所以请勿抄袭。您可以作为参考，但是
  - 一定不可以抄袭，尤其是同校同学！！！
  - 你们可以自己参考代码优化给你们提供思路，开源目的不是给你们抄袭的，共
  - 同维护好开源的社区环境！！！
  -
  - 使用本软件即表示您了解此声明并同意其条款。
  -
  - 有关MIT许可证的更多信息，请查看项目根目录下的LICENSE文件或访问：
  - https://opensource.org/licenses/MIT
  - ********************************************************************************
  - 免责声明：
  -
  - 使用本软件的风险由用户自担。作者或版权持有人在法律允许的最大范围内，
  - 对因使用本软件内容而导致的任何直接或间接的损失不承担任何责任。
  - ********************************************************************************
  -->

<script lang="ts">
import {userCurrentApi} from "@/apis/user-api";
import {message} from "ant-design-vue";
import DashboardHeader from "@/components/DashboardHeader.vue";
import DashboardFooter from "@/components/DashboardFooter.vue";
import type {BaseResponseDTO} from "@/models/dto/customDTO";
import type {userCurrentDTO} from "@/models/dto/userCurrentDTO";

export default {
  name: 'BaseDashboard',
  components: {DashboardFooter, DashboardHeader},
  data() {
    return {
      getUserApi: userCurrentApi(),
      getUser: {} as BaseResponseDTO<userCurrentDTO>
    }
  },
  async created() {
    // 检查当前地址是否不含二级地址
    if (this.$route.path === '/dashboard') {
      this.$router.replace({name: 'DashboardHome'});
    }
    this.getUser = await this.getUserApi;
    if (this.getUser?.output !== "Success") {
      message.warn("登录已失效")
      localStorage.removeItem("token");
      localStorage.removeItem("uuid");
      this.$router.replace({name: 'AuthLogin', replace: true});
    } else {
      console.debug("[CONTROL] 用户 " + this.getUser?.data.username + " 登录有效", )
    }
  },
  provide() {
    return {
      getUserApi: () => this.getUserApi
    }
  }
}
</script>

<template>
  <div class="w-full grid gap-3" id="background-image">
    <div class="bg-gray-50 shadow">
      <DashboardHeader/>
    </div>
    <div class="py-12 w-full">
      <div class="flex justify-center mx-20">
        <RouterView/>
      </div>
    </div>
    <div class="text-center py-3">
      <DashboardFooter/>
    </div>
  </div>
</template>

<style scoped>
#background-image {
  background-image: linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url("@/assets/images/background-dashboard.webp");
  background-size: 400px;
  background-repeat: repeat;
}
</style>

