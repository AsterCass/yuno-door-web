import {serviceShiro} from '@/utils/request'


export function login(body) {
    return serviceShiro({
        url: `/yui/user/login`,
        method: 'post',
        data: body
    })
}

export function sendMail(body) {
    return serviceShiro({
        url: `/yui/user/sendMail`,
        method: 'post',
        data: body
    })
}

export function isLogin(id) {
    return serviceShiro({
        url: `/yui/user/${id}/isLogin`,
        method: 'get',
    })
}

export function updateInfo(id, body) {
    return serviceShiro({
        url: `/yui/user/${id}/updateInfo`,
        method: 'patch',
        data: body
    })
}

export function registry(body) {
    return serviceShiro({
        url: `/yui/user/registry`,
        method: 'post',
        data: body
    })
}
