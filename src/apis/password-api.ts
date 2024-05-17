/*
 * *******************************************************************************
 * Copyright (c) 2016-NOW(至今) 筱锋
 * Author: 筱锋(https://www.x-lf.com)
 *
 * 本文件包含 SecuriValue 的源代码，该项目的所有源代码均遵循MIT开源许可证协议。
 * 本代码仅进行 Java 大作业提交，个人发行版本计划使用 Go 语言重构。
 * *******************************************************************************
 * 许可证声明：
 *
 * 版权所有 (c) 2016-2024 筱锋。保留所有权利。
 *
 * 本软件是“按原样”提供的，没有任何形式的明示或暗示的保证，包括但不限于
 * 对适销性、特定用途的适用性和非侵权性的暗示保证。在任何情况下，
 * 作者或版权持有人均不承担因软件或软件的使用或其他交易而产生的、
 * 由此引起的或以任何方式与此软件有关的任何索赔、损害或其他责任。
 *
 * 由于作者需要进行 Java 大作业提交，所以请勿抄袭。您可以作为参考，但是
 * 一定不可以抄袭，尤其是同校同学！！！
 * 你们可以自己参考代码优化给你们提供思路，开源目的不是给你们抄袭的，共
 * 同维护好开源的社区环境！！！
 *
 * 使用本软件即表示您了解此声明并同意其条款。
 *
 * 有关MIT许可证的更多信息，请查看项目根目录下的LICENSE文件或访问：
 * https://opensource.org/licenses/MIT
 * *******************************************************************************
 * 免责声明：
 *
 * 使用本软件的风险由用户自担。作者或版权持有人在法律允许的最大范围内，
 * 对因使用本软件内容而导致的任何直接或间接的损失不承担任何责任。
 * *******************************************************************************
 */

import type {BaseResponseDTO} from "@/models/dto/customDTO";
import axios from "axios";
import {apiURL, getAuthorization} from "@/apis/api-link";
import type {passwordGeneralDTO} from "@/models/dto/passwordGeneral";
import type {passwordDTO} from "@/models/dto/PasswordDTO";
import type {passwordEntity} from "@/models/entity/password";

async function getPasswordGeneralApi(): Promise<BaseResponseDTO<passwordGeneralDTO>> {
    let returnData = {} as BaseResponseDTO<passwordGeneralDTO>;
    await axios({
        method: 'GET',
        url: apiURL + "/api/v1/password/general",
        headers: {
            "Authorization": getAuthorization(),
            "X-User-Uuid": localStorage.getItem("uuid"),
        }
    }).then((response) => {
        console.debug("[API] 执行接口 getPasswordGeneralApi", response);
        returnData = response.data;
    }).catch((error) => {
        console.warn("[API] 执行接口 getPasswordGeneralApi 出现错误", error);
        returnData = error.response.data;
    }).finally(() => {
        console.debug("[API] 接口请求数据返回结果", returnData);
    })
    return returnData;
}

async function getPasswordsApi(): Promise<BaseResponseDTO<passwordDTO>> {
    let returnData = {} as BaseResponseDTO<passwordDTO>;
    await axios({
        method: 'GET',
        url: apiURL + "/api/v1/password/list",
        headers: {
            "Authorization": getAuthorization(),
            "X-User-Uuid": localStorage.getItem("uuid"),
        }
    }).then((response) => {
        console.debug("[API] 执行接口 getPasswordsApi", response);
        returnData = response.data;
    }).catch((error) => {
        console.warn("[API] 执行接口 getPasswordsApi 出现错误", error);
        returnData = error.response.data;
    }).finally(() => {
        console.debug("[API] 接口请求数据返回结果", returnData);
    })
    return returnData;
}

async function addPasswordApi(data: passwordEntity): Promise<BaseResponseDTO<null>> {
    let returnData = {} as BaseResponseDTO<null>;
    await axios({
        method: 'POST',
        url: apiURL + "/api/v1/password",
        headers: {
            "Authorization": getAuthorization(),
            "X-User-Uuid": localStorage.getItem("uuid"),
        },
        data: data
    }).then((response) => {
        console.debug("[API] 执行接口 addPasswordApi", response);
        returnData = response.data;
    }).catch((error) => {
        console.warn("[API] 执行接口 addPasswordApi 出现错误", error);
        returnData = error.response.data;
    }).finally(() => {
        console.debug("[API] 接口请求数据返回结果", returnData);
    })
    return returnData;
}

export {getPasswordGeneralApi, getPasswordsApi, addPasswordApi};
