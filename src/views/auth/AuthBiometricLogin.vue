<script setup lang="ts">
import {message} from "ant-design-vue";

async function loginWithFingerprint() {
  // 阻止表单提交
  if (!navigator.credentials) {
    message.warn('WebAuthn API不支持在此浏览器。');
    return;
  }

  try {
    const publicKeyCredentialRequestOptions = {
      challenge: new Uint8Array([123]), // 挑战应从服务器动态生成并提供
      allowCredentials: [{
        type: 'public-key',
        id: new Uint8Array([123]), // 凭据ID应由注册过程提供并从服务器获得
      }],
      timeout: 60000, // 可选，超时时间
      userVerification: 'required' // 需要用户验证
    };

    const credential = await navigator.credentials.get({
      publicKey: publicKeyCredentialRequestOptions
    });

    // 在这里，您可以将credential响应发送到后端进行验证
    console.log(credential);
  } catch (err) {
    console.log(err)
    if (err === 'InvalidStateError') {
      message.warn(`认证失败: ${err.message}`);
    }
  }
}
</script>

<template>
  <div class="text-center">
    <h3 class="text-lg font-bold text-gray-900 sm:text-xl lg:text-4xl">
      SecuriVault
    </h3>
    <p class="mt-1 text-xs lg:text-xl font-medium text-gray-600">外部认证登录</p>
  </div>

  <form class="mt-6 grid gap-3 sm:gap-6" @submit.prevent="loginWithFingerprint">
    <div>
      <label
          class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
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
    <div class="text-right">
      <span class="text-emerald-500" @click="$router.push({name: 'AuthLogin'})">账号密码登录</span>
      <span> | </span>
      <span class="text-emerald-500" @click="$router.push({name: 'AuthRegister'})">注册账号</span>
    </div>
    <div class="text-center">
      <button
          class="inline-block rounded border border-blue-400 px-8 py-2 text-sm font-medium text-blue-400 transition hover:-rotate-6 hover:scale-110 focus:outline-none focus:ring active:text-blue-500"
          type="submit"
      >
        登录
      </button>
    </div>
  </form>
</template>

<style scoped>

</style>
