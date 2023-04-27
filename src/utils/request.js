import axios from 'axios'
import Qs from 'qs'
import {getLoginToken} from "@/utils/store";

const BASE_ADD = process.env.VUE_APP_BASE_ADD


const requestConfig = config => {
    const userToken = getLoginToken()
    if (userToken) {
        config.headers.set('User-Token', userToken)
    } else {
        config.headers.set('User-Token', "")
    }
    return config
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


export {
    serviceShiro
}