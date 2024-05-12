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

<script lang="ts" setup>
import {message} from "ant-design-vue";
import type {userLoginEntity} from "@/models/entity/auth";
import {ref} from "vue";
import {authLoginApi} from "@/apis/auth-api";
import router from "@/route";

const userLoginVO = ref({} as userLoginEntity);

/**
 * 用户登录表单处理
 */
async function formUserLogin() {
  if (userLoginVO.value.user === "" || userLoginVO.value.password === "") {
    message.warn('用户名和密码不能为空。');
    return;
  }
  // 操作数据进行请求
  const getData = await authLoginApi(userLoginVO.value.user, userLoginVO.value.password);
  if (getData.output === "Success") {
    message.success('登录成功。');
    await router.push({name: 'ConsoleHome', replace: true});
  } else {
    message.warn(getData.message);
  }
}
</script>

<template>
  <div class="text-center">
    <h3 class="text-lg font-bold text-gray-900 sm:text-xl lg:text-4xl">
      SecuriVault
    </h3>
    <p class="mt-1 text-xs lg:text-xl font-medium text-gray-600">授权登录 {{userLoginVO.user}}</p>
  </div>

  <form class="mt-6 grid gap-3 sm:gap-6" @submit.prevent="formUserLogin">
    <div>
      <label
          class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
      >
        <input
            id="username"
            class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
            placeholder="用户名"
            type="text"
            v-model="userLoginVO.user"
            required
        />
        <span
            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
        >
          用户名
        </span>
      </label>
    </div>
    <div>
      <label
          class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
      >
        <input
            id="password"
            class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
            placeholder="密码"
            type="password"
            v-model="userLoginVO.password"
            required
        />
        <span
            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
        >
          密码
        </span>
      </label>
    </div>
    <div class="text-right">
      <span class="text-emerald-500" @click="$router.push({name: 'AuthForgetPassword'})">忘记密码</span>
      <span> | </span>
      <span class="text-emerald-500" @click="$router.push({name: 'AuthRegister'})">注册账号</span>
    </div>
    <div class="flex justify-center gap-4">
      <button
          class="inline-block rounded border border-blue-400 px-5 py-2 text-sm font-medium text-blue-400 transition hover:-rotate-6 hover:scale-110 focus:outline-none focus:ring active:text-blue-500"
          type="button"
          @click="$router.push({name: 'AuthBiometricLogin'})"
      >
        外部认证
      </button>
      <button
          class="inline-block rounded border border-blue-400 px-8 py-2 text-sm font-medium text-blue-400 transition hover:rotate-6 hover:scale-110 focus:outline-none focus:ring active:text-blue-500"
          type="submit"
      >
        登录
      </button>
    </div>
  </form>
</template>

<style scoped>

</style>
