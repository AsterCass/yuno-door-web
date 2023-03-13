import axios from 'axios'
import Qs from 'qs'

const BASE_ADD = process.env.VUE_APP_BASE_ADD

const serviceShiro = axios.create({
    baseURL: BASE_ADD, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 60000, // request timeout
    paramsSerializer: {
        paramsSerializer: function (params) {
            //序列化请求参数，避免get请求参数出现&,空格等识别错误的问题
            if (params) {
                for (let key in params) {
                    if (Object.prototype.toString.call(params[key]) == '[object String]') {
                        params[key] = params[key].replace(/(^\s*)|(\s*$)/g, '')
                    }
                }
            }

            return Qs.stringify(params, {arrayFormat: 'repeat'})
        }
    }
})


export {
    serviceShiro
}