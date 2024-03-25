import {serviceShiro} from '@/utils/request'

export function moreMessage(params) {
    return serviceShiro({
        url: `/yui/user/chat/message/authNoError`,
        params: params,
        method: 'get',
    })
}

export function chattingUsers() {
    return serviceShiro({
        url: `/yui/user/chat/chattingUsers/authNoError`,
        method: 'get',
    })
}
