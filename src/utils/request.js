import axios from 'axios'
import Qs from 'qs'
import {getWebLoginToken, webLogout} from "@/utils/store";

const BASE_ADD = process.env.VUE_APP_BASE_ADD


const requestConfig = config => {
    const userToken = getWebLoginToken()
    if (userToken) {
        config.headers.set('User-Token', userToken)
    } else {
        config.headers.set('User-Token', "")
    }
    return config
}

const responseConfig = response => {
    if (200 === response.status) {
        const serverData = response.data
        if (serverData instanceof Object) {
            const status = serverData.status
            if (600 === status) {
                webLogout()
            }
        }
    }
    return response;
}


const serviceShiro = axios.create({
    baseURL: BASE_ADD,
    timeout: 60000,
    paramsSerializer: {
        paramsSerializer: function (params) {
            return Qs.stringify(params, {arrayFormat: 'repeat'})
        }
    }
})

serviceShiro.interceptors.request.use(requestConfig)

serviceShiro.interceptors.response.use(responseConfig)


export {
    serviceShiro
}