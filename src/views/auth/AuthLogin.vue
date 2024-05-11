<script setup lang="ts">
import {message} from "ant-design-vue";

async function formUserLogin() {
  message.warn("等待中");
}
</script>

<template>
  <div class="text-center">
    <h3 class="text-lg font-bold text-gray-900 sm:text-xl lg:text-4xl">
      SecuriVault
    </h3>
    <p class="mt-1 text-xs lg:text-xl font-medium text-gray-600">授权登录</p>
  </div>

  <form class="mt-6 grid gap-3 sm:gap-6" @submit.prevent="formUserLogin">
    <div>
      <label
          class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          for="Username"
      >
        <input
            id="username"
            class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
            placeholder="用户名"
            type="text"
            required
        />
        <span
            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
        >
                用户名 <span style="color: red">*</span>
            </span>
      </label>
    </div>
    <div>
      <label
          class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          for="Username"
      >
        <input
            id="password"
            class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
            placeholder="密码"
            type="password"
            required
        />
        <span
            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
        >
                密码 <span style="color: red">*</span>
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
