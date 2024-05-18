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
import {defineComponent} from 'vue'
import {LoadingOutlined, MinusOutlined, PlusOutlined} from "@ant-design/icons-vue";
import type {tokenEntity} from "@/models/entity/token";
import _default from "ant-design-vue/es/vc-slick/inner-slider";
import {message} from "ant-design-vue";
import {addTokenApi} from "@/apis/token-api";

export default defineComponent({
  name: "DashboardAddToken",
  components: {PlusOutlined, MinusOutlined, LoadingOutlined},
  props: {
    showModal: Boolean
  },
  data() {
    return {
      confirmLoading: false,
      modal: false,
      addToken: {} as tokenEntity
    }
  },
  watch: {
    showModal: {
      immediate: true,
      handler: function (val) {
        this.modal = val;
      }
    },
    modal(val) {
      this.$emit('updateModal', val);
    }
  },
  methods: {
    async handleOk() {
      if (this.addToken.site === undefined || this.addToken.site === "") {
        message.warn('站点信息不能为空');
        return;
      }
      if (this.addToken.secretKey === undefined || this.addToken.secretKey === "") {
        message.warn('授权密钥不能为空');
        return;
      }
      this.confirmLoading = true;
      // 提交
      const returnData = await addTokenApi(this.addToken);
      if (returnData.output === "Success") {
        message.success(returnData.message);
        this.addToken = {} as tokenEntity;
        this.confirmLoading = false;
        this.modal = false;
        this.$emit('addToken', true);
      } else {
        message.warn(returnData.errorMessage);
        this.confirmLoading = false;
        this.$emit('addToken', false);
      }
    },
    cancel() {
      this.addToken = {} as tokenEntity;
      this.modal = false;
    }
  }
})
</script>

<template>
  <a-modal v-model:open="modal" title="添加令牌">
    <form class="grid gap-3">
      <div>
        <label
            class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
              id="site"
              v-model="addToken.site"
              class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
              placeholder="站点平台"
              required
              type="text"
          />
          <span
              class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
          >
            站点平台
          </span>
        </label>
      </div>
      <div>
        <label
            class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
              id="accessKey"
              v-model="addToken.accessKey"
              class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
              placeholder="账户密钥(选)"
              required
              type="text"
          />
          <span
              class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
          >
            账户(选)
          </span>
        </label>
      </div>
      <div>
        <label
            class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
              id="secretKey"
              v-model="addToken.secretKey"
              class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
              placeholder="授权密钥(必)"
              required
              type="password"
          />
          <span
              class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
          >
            授权密钥(必)
          </span>
        </label>
      </div>
      <div>
        <label
            class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <textarea
              id="description"
              v-model="addToken.description"
              class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
              placeholder="描述"
              required
              type="text"
          />
          <span
              class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
          >
            描述
          </span>
        </label>
      </div>
    </form>

    <template #footer>
      <div class="flex justify-end gap-4">
        <button
            class="inline-block rounded border border-red-400 px-3 py-1 text-sm font-medium text-red-400 transition hover:-rotate-6 hover:scale-110 focus:outline-none focus:ring ring-red-300 active:text-red-500"
            type="button"
            @click="cancel()"
        >
          <span class="flex items-center">
            <MinusOutlined class="pe-1"/>
            <span>取消</span>
          </span>
        </button>
        <button
            class="inline-block rounded border border-blue-400 px-3 py-1 text-sm font-medium text-blue-400 transition hover:rotate-6 hover:scale-110 focus:outline-none focus:ring active:text-blue-500"
            type="submit"
            @click="handleOk()"
        >
          <span class="flex items-center">
            <PlusOutlined v-if="!confirmLoading" class="pe-1"/>
            <LoadingOutlined v-else class="pe-1"/>
            <span>添加</span>
          </span>
        </button>
      </div>
    </template>
  </a-modal>
</template>
