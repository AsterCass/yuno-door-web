import {serviceShiro} from '@/utils/request'


export function userLogin(body) {
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

export function userLogout(id) {
    return serviceShiro({
        url: `/yui/user/${id}/logout/auth`,
        method: 'post',
    })
}

export function userIsLogin() {
    return serviceShiro({
        url: `/yui/user/isLogin`,
        method: 'get',
    })
}


export function userDetail(id) {
    return serviceShiro({
        url: `/yui/user/${id}/detail/auth`,
        method: 'get',
    })
}


export function updateInfo(id, body) {
    return serviceShiro({
        url: `/yui/user/${id}/updateInfo/auth`,
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
