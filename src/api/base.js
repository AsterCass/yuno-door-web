import {serviceShiro} from '@/utils/request'


export function getBlogContent(params) {
    return serviceShiro({
        url: '/tool-kit/blog',
        method: 'get',
        params: params,
        responseType: "blob"
    })
}

