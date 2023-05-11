import {serviceShiro} from '@/utils/request'


export function getCommentTree(mainId) {
    return serviceShiro({
        url: `/yui/comment/${mainId}/list`,
        method: 'get',
    })
}

export function replyComment(body) {
    return serviceShiro({
        url: `/yui/comment/insert/authNoError`,
        method: 'post',
        data: body
    })
}
