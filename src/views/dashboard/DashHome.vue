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

import type {BaseResponseDTO} from "@/models/dto/customDTO";
import type {userCurrentDTO} from "@/models/dto/userCurrentDTO";
import {CompassTwoTone, DeleteTwoTone, FileAddTwoTone, LockOutlined, UserOutlined} from "@ant-design/icons-vue";
import type {passwordGeneralDTO} from "@/models/dto/passwordGeneral";
import {getPasswordGeneralApi} from "@/apis/password-api";

export default {
  name: "DashboardHome",
  inject: ['getUserApi'],
  components: {FileAddTwoTone, CompassTwoTone, DeleteTwoTone, LockOutlined, UserOutlined},
  data() {
    return {
      getUser: {} as BaseResponseDTO<userCurrentDTO>,
      getPasswordGeneral: {} as BaseResponseDTO<passwordGeneralDTO>
    }
  },
  async created() {
    // 确保 getUser 是一个函数并且能调用
    if (typeof this.getUserApi === 'function') {
      this.getUser = await this.getUserApi();
    }
    this.getPasswordGeneral = await getPasswordGeneralApi()
  }
}
</script>

<template>
  <div class="grid grid-cols-12 gap-8 w-full">
    <div class="col-span-9">
      <article class="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 shadow-lg">
        <div class="grid grid-cols-2 gap-8">
          <div>
            <div class="block rounded-lg p-4 shadow border transition hover:scale-105 hover:shadow-lg" @click="$router.push({name: 'DashboardPassword'})">
              <div>
                <dl>
                  <div class="text-sm text-gray-500">密码本</div>
                  <div>
                    <span class="font-medium">当前有 <span class="font-bold">{{ getPasswordGeneral?.data?.totalPassword }}</span> 个密码</span>
                  </div>
                </dl>
                <div class="mt-3 flex items-center gap-8 text-xs">
                  <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                    <FileAddTwoTone/>
                    <div class="mt-1.5 sm:mt-0">
                      <p class="text-gray-500">近日添加</p>
                      <p class="font-medium">{{ getPasswordGeneral?.data?.recentlyAdd }} 个</p>
                    </div>
                  </div>
                  <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                    <CompassTwoTone/>
                    <div class="mt-1.5 sm:mt-0">
                      <p class="text-gray-500">近日查询</p>
                      <p class="font-medium">{{ getPasswordGeneral?.data?.recentlyGet }} 个</p>
                    </div>
                  </div>
                  <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                    <DeleteTwoTone/>
                    <div class="mt-1.5 sm:mt-0">
                      <p class="text-gray-500">近日删除</p>
                      <p class="font-medium">{{ getPasswordGeneral?.data?.recentlyRemove }} 个</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="block rounded-lg p-4 shadow border transition hover:scale-105 hover:shadow-lg" @click="$router.push({name: 'DashboardToken'})">
              <div>
                <dl>
                  <div class="text-sm text-gray-500">令牌库</div>
                  <div>
                    <span class="font-medium">当前有 <span class="font-bold">XX</span> 个令牌</span>
                  </div>
                </dl>
                <div class="mt-3 flex items-center gap-8 text-xs">
                  <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                    <FileAddTwoTone/>
                    <div class="mt-1.5 sm:mt-0">
                      <p class="text-gray-500">近日添加</p>
                      <p class="font-medium">2 个</p>
                    </div>
                  </div>
                  <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                    <CompassTwoTone/>
                    <div class="mt-1.5 sm:mt-0">
                      <p class="text-gray-500">近日查询</p>
                      <p class="font-medium">2 个</p>
                    </div>
                  </div>
                  <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                    <DeleteTwoTone/>
                    <div class="mt-1.5 sm:mt-0">
                      <p class="text-gray-500">近日删除</p>
                      <p class="font-medium">2 个</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-2 grid">
            <div class="mb-3 text-2xl flex items-center">
              <LockOutlined class="pe-1"/>
              <span class="font-bold">审计日志</span>
            </div>
            <table class="w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead class="ltr:text-left rtl:text-right text-left">
              <tr>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">平台</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">站点</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">账号</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">操作</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">时间</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
              <tr class="odd:bg-gray-50">
                <td class="whitespace-nowrap px-4 py-2 text-gray-900">John Doe</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">Web Developer</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
              </tr>
              <tr class="odd:bg-gray-50">
                <td class="whitespace-nowrap px-4 py-2 text-gray-900">Jane Doe</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">04/11/1980</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">Web Designer</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">$100,000</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">$100,000</td>
              </tr>
              <tr class="odd:bg-gray-50">
                <td class="whitespace-nowrap px-4 py-2 text-gray-900">Gary Barlow</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">Singer</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">$20,000</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">$20,000</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </article>
    </div>
    <div class="col-span-3">
      <article class="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 shadow-lg">
        <div class="grid gap-3">
          <div class="grid justify-center">
            <img alt="MyAvatar" class="w-28 h-full rounded-full" src="@/assets/images/myAvatar.png">
          </div>
          <div class="text-center font-extrabold text-3xl">{{ getUser.data?.username }}</div>
          <div class="mb-2">
            <hr/>
          </div>
          <div class="grid gap-3 grid-cols-2">
            <button
                class="inline-block rounded border border-blue-400 py-1 text-sm font-medium text-blue-400 transition hover:scale-110 focus:outline-none focus:ring active:text-blue-500"
                type="submit"
            >
              <span class="flex items-center justify-center">
                <UserOutlined class="pe-1"/>
                <span>个人资料</span>
              </span>
            </button>
            <button
                class="inline-block rounded border border-red-400 py-1 text-sm font-medium text-red-400 transition hover:scale-110 focus:outline-none focus:ring ring-red-300 active:text-red-500"
                type="submit"
            >
              <span class="flex items-center justify-center">
                <UserOutlined class="pe-1"/>
                <span>管理面板</span>
              </span>
            </button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>

</style>
