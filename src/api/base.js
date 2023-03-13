import {serviceShiro} from '@/utils/request'


export function health(params) {
    return serviceShiro({
        url: '/tool-kit/text',
        method: 'get',
        params: params
    })
}

