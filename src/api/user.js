import {serviceShiro} from '@/utils/request'


export function login(body) {
    return serviceShiro({
        url: `/yui/user/login`,
        method: 'post',
        data: body
    })
}
