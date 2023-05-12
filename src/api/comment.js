import {serviceShiro} from '@/utils/request'


export function getCommentTree(mainId) {
    return serviceShiro({
        url: `/yui/comment/${mainId}/list/authNoError`,
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

export function likeComment(mainId, likeStatus) {
    return serviceShiro({
        url: `/yui/comment/like/${mainId}/auth?likeStatus=${likeStatus}`,
        method: 'post',
    })
}
