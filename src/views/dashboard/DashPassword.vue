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
import {AppstoreAddOutlined, DeleteOutlined, EditOutlined, EyeOutlined, LockOutlined} from "@ant-design/icons-vue";
import {getPasswordsApi} from "@/apis/password-api";
import type {BaseResponseDTO} from "@/models/dto/customDTO";
import type {Password, passwordDTO} from "@/models/dto/PasswordDTO";

export default {
  name: "DashPassword",
  components: {LockOutlined, EyeOutlined, DeleteOutlined, EditOutlined, AppstoreAddOutlined,},
  data() {
    return {
      getPasswordList: {} as BaseResponseDTO<passwordDTO>,
      addPasswordModal: false,
      delPasswordModal: false,
      delPasswordUuid: {} as Password,
      showPasswordModal: false,
      showPasswordUuid: "",
      editPasswordModal: false,
      editPasswordInfo: {} as Password,
      hasListChange: false,
    }
  },
  async created() {
    this.getPasswordList = await getPasswordsApi()
  },
  watch: {
    hasListChange: {
      handler: async function (value) {
        if (value) {
          this.getPasswordList = await getPasswordsApi()
          this.hasListChange = false;
        }
      },
      immediate: true
    }
  }
}
</script>

<script lang="ts" setup>
import DashboardAddPassword from "@/components/DashboardAddPassword.vue";
import DashboardDeletePassword from "@/components/DashboardDeletePassword.vue";
import DashboardSeePassword from "@/components/DashboardSeePassword.vue";
import DashboardEditPassword from "@/components/DashboardEditPassword.vue";

function conversionTime(time: Date) {
  if (!time) {
    return null
  } else {
    return new Date(time).toLocaleString()
  }
}
</script>

<template>
  <div class="grid gap-8 w-full">
    <article class="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 shadow-lg">
      <div class="col-span-2 grid">
        <div class="grid grid-cols-2 gap-3">
          <div class="mb-3 text-2xl flex items-center justify-start">
            <LockOutlined class="pe-3"/>
            <span class="font-bold">密码本</span>
          </div>
          <div class="flex items-center justify-end gap-3 mb-3">
            <button
                class="inline-block rounded border border-blue-400 py-1 px-3 text-sm font-medium text-blue-400 transition hover:scale-110 focus:outline-none focus:ring active:text-blue-500 hover:rotate-6 active:rotate-12"
                @click="() => addPasswordModal = true"
            >
              <span class="flex items-center justify-center">
                <AppstoreAddOutlined class="pe-1"/>
                <span>添加密码</span>
              </span>
            </button>
          </div>
        </div>
        <table class="w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead class="ltr:text-left rtl:text-right text-left">
          <tr>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">站点</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">用户名</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">查看时间</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">创建时间</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">更新时间</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">操作</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
          <tr v-for="(password, index) in getPasswordList?.data?.password" :key="index" class="odd:bg-gray-50">
            <td class="whitespace-nowrap px-4 py-2 text-gray-900">
              <a :href="password.website" class="text-blue-400 hover:text-blue-500" target="_blank">
                {{ password.website }}
              </a>
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ password.username }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ conversionTime(password.seeTime) }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ conversionTime(password.createdAt) }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ conversionTime(password.updatedAt) }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700 flex gap-3">
              <div class="transition hover:scale-110 text-blue-400 hover:text-blue-500">
                <button class="flex items-center" type="button"
                        @click="() => {showPasswordModal = true; showPasswordUuid = password.id;}">
                  <EyeOutlined class="pe-1"/>
                  <span>查看</span>
                </button>
              </div>
              <div class="transition hover:scale-110 text-blue-400 hover:text-blue-500">
                <button class="flex items-center" type="button"
                        @click="() => {editPasswordModal = true; editPasswordInfo = password;}">
                  <EditOutlined class="pe-1"/>
                  <span>修改</span>
                </button>
              </div>
              <div class="transition hover:scale-110 text-red-400 hover:text-red-500">
                <button class="flex items-center" type="button"
                        @click="() => {delPasswordModal = true; delPasswordUuid = password;}">
                  <DeleteOutlined class="pe-1"/>
                  <span>删除</span>
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </article>
  </div>
  <DashboardAddPassword
      :show-modal="addPasswordModal"
      @update-modal="(newValue) => addPasswordModal = newValue"
      @add-password="(isAdd) => hasListChange = isAdd"
  />
  <DashboardDeletePassword
      :del-uuid="delPasswordUuid"
      :show-modal="delPasswordModal"
      @update-modal="(newValue) => delPasswordModal = newValue"
      @del-password="(isDel) => hasListChange = isDel"
  />
  <DashboardSeePassword
      :show-modal="showPasswordModal"
      :show-uuid="showPasswordUuid"
      @update-modal="(newValue) => showPasswordModal = newValue"
  />
  <DashboardEditPassword
      :show-modal="editPasswordModal"
      :edit-password="editPasswordInfo"
      @update-modal="(newValue) => editPasswordModal = newValue"
  />
</template>

<style scoped>

</style>
