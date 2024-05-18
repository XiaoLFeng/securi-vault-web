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
import {CheckOutlined, EditOutlined, LoadingOutlined} from "@ant-design/icons-vue";
import DashboardAuthorization from "@/components/DashboardAuthorization.vue";
import type {Password} from "@/models/dto/PasswordDTO";
import {message} from "ant-design-vue";
import {editPasswordApi} from "@/apis/password-api";
import type {passwordEditDTO} from "@/models/dto/passwordEditDTO";

export default defineComponent({
  name: "DashboardEditPassword",
  components: {CheckOutlined, EditOutlined, DashboardAuthorization, LoadingOutlined},
  props: {
    showModal: Boolean,
    editPassword: {} as Password
  },
  data() {
    return {
      confirmLoading: false,
      passwordInfo: {} as Password,
      editPasswordInfo: {} as passwordEditDTO,
      modal: false,
      authorizationModal: false,
      authorizationCode: ""
    }
  },
  methods: {
    async handleOk() {
      if (this.passwordInfo.id === "") {
        message.warn('密码不能为空');
        return;
      }
      if (this.editPasswordInfo.password === undefined || this.editPasswordInfo.password === "") {
        message.warn('密码不能为空');
        return;
      }
      this.confirmLoading = true;
      const returnData = await editPasswordApi(this.editPasswordInfo, this.passwordInfo.id, this.authorizationCode);
      if (returnData.output === "Success") {
        message.success('修改成功');
        this.confirmLoading = false;
        this.modal = false;
      } else {
        if (returnData.output === "NeedReAuthentication") {
          this.confirmLoading = false;
          this.modal = false;
          this.authorizationModal = true;
        } else {
          message.error(returnData.errorMessage);
          this.confirmLoading = false;
        }
      }
    },
    cancel() {
      this.modal = false;
    }
  },
  watch: {
    showModal: {
      handler: function (val) {
        this.modal = val;
      },
      immediate: true
    },
    modal(val) {
      this.$emit('update-modal', val);
    },
    editPassword: {
      handler: function (val) {
        console.log(val)
        this.passwordInfo = val;
      },
      immediate: true
    },
    authorizationCode: {
      handler: async function (val) {
        if (val !== "") {
          this.authorizationModal = false;
          const returnData = await editPasswordApi(this.editPasswordInfo, this.passwordInfo.id, this.authorizationCode);
          if (returnData.output === "Success") {
            message.success('删除成功');
            this.confirmLoading = false;
            this.modal = false;
          } else {
            if (returnData.output === "NeedReAuthentication") {
              this.confirmLoading = false;
              this.modal = false;
              this.authorizationModal = true;
            } else {
              message.error(returnData.errorMessage);
              this.confirmLoading = false;
            }
          }
        }
      },
      immediate: true
    }
  }
})
</script>

<template>
  <a-modal v-model:open="modal" title="编辑密码">
    <div class="flow-root mt-8 mb-6">
      <dl class="-my-3 divide-y divide-gray-100 text-sm">
        <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900">序列号</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ passwordInfo.id }}</dd>
        </div>

        <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900">站点</dt>
          <dd class="text-gray-700 sm:col-span-2">
            <a :href="passwordInfo.website" class="text-blue-400 hover:text-blue-500"
               target="_blank">{{ passwordInfo.website }}</a>
          </dd>
        </div>

        <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900">账号</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ passwordInfo.username }}</dd>
        </div>
      </dl>
    </div>
    <form class="grid gap-3">
      <div>
        <label
            class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
              id="password"
              v-model="editPasswordInfo.password"
              class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
              placeholder="密码"
              required
              type="text"
          />
          <span
              class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
          >
            密码
          </span>
        </label>
      </div>
    </form>

    <template #footer>
      <div class="flex justify-end gap-4">
        <button
            class="inline-block rounded border border-blue-400 px-3 py-1 text-sm font-medium text-blue-400 transition hover:rotate-6 hover:scale-110 focus:outline-none focus:ring active:text-blue-500"
            type="button"
            @click="cancel()"
        >
          <span class="flex items-center">
            <CheckOutlined class="pe-1"/>
            <span>取消</span>
          </span>
        </button>
        <button
            class="inline-block rounded border border-red-400 px-3 py-1 text-sm font-medium text-red-400 transition hover:-rotate-6 hover:scale-110 focus:outline-none focus:ring ring-red-300 active:text-red-500"
            type="submit"
            @click="handleOk()"
        >
          <span class="flex items-center">
            <EditOutlined v-if="!confirmLoading" class="pe-1"/>
            <LoadingOutlined v-else class="pe-1"/>
            <span>修改</span>
          </span>
        </button>
      </div>
    </template>
  </a-modal>
  <DashboardAuthorization
      :show-modal="authorizationModal"
      @update-modal="(newValue) => authorizationModal = newValue"
      @authorization="(newValue) => authorizationCode = newValue"
  />
</template>

<style scoped>

</style>
