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
import {CheckOutlined, DeleteOutlined, LoadingOutlined} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";
import {delPasswordApi} from "@/apis/password-api";
import type {Password} from "@/models/dto/PasswordDTO";
import DashboardAuthorization from "@/components/DashboardAuthorization.vue";

export default defineComponent({
  name: "DashboardDeletePassword",
  components: {DashboardAuthorization, DeleteOutlined, CheckOutlined, LoadingOutlined},
  props: {
    showModal: Boolean,
    delUuid: {} as Password
  },
  data() {
    return {
      confirmLoading: false,
      delPasswordUuid: {} as Password,
      modal: false,
      authorizationModal: false,
      authorizationCode: ""
    }
  },
  methods: {
    async handleOk() {
      if (this.delPasswordUuid === "") {
        message.warn('删除信息不能为空');
      }
      this.confirmLoading = true;
      const returnData = await delPasswordApi(this.delPasswordUuid.id, this.authorizationCode);
      if (returnData.output === "Success") {
        message.success('删除成功');
        this.confirmLoading = false;
        this.modal = false;
        this.$emit('delPassword', true);
      } else {
        if (returnData.output === "NeedReAuthentication") {
          this.confirmLoading = false;
          this.modal = false;
          this.authorizationModal = true;
        } else {
          message.error(returnData.errorMessage);
          this.confirmLoading = false;
          this.$emit('delPassword', false);
        }
      }
    },
    cancel() {
      this.modal = false;
      this.confirmLoading = false;
    }
  },
  watch: {
    showModal: {
      handler: function (value) {
        this.modal = value
      },
      immediate: true
    },
    delUuid: {
      handler: function (value) {
        this.delPasswordUuid = value
      },
      immediate: true
    },
    authorizationCode: {
      handler: async function (value) {
        if (value !== "") {
          this.authorizationModal = false;
          const returnData = await delPasswordApi(this.delPasswordUuid.id, this.authorizationCode);
          if (returnData.output === "Success") {
            message.success('删除成功');
            this.confirmLoading = false;
            this.modal = false;
            this.$emit('delPassword', true);
          } else {
            if (returnData.output === "NeedReAuthentication") {
              this.confirmLoading = false;
              this.modal = false;
              this.authorizationModal = true;
            } else {
              message.error(returnData.errorMessage);
              this.confirmLoading = false;
              this.$emit('delPassword', false);
            }
          }
        }
      },
      immediate: true
    },
    async modal(val) {
      this.$emit('updateModal', val);
    }
  },
})
</script>

<template>
  <a-modal v-model:open="modal" title="删除密码">
    <div>
      <span>确定要删除 <span class="font-bold">{{ delPasswordUuid.website }}</span> 中 <span
          class="font-bold">{{ delPasswordUuid.username }}</span> 的密码吗？这将会失去很长很长时间......</span>
    </div>

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
            <DeleteOutlined v-if="!confirmLoading" class="pe-1"/>
            <LoadingOutlined v-else class="pe-1"/>
            <span>删除</span>
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
