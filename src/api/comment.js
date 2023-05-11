import {serviceShiro} from '@/utils/request'


export function getCommentTree(mainId) {
    return serviceShiro({
        url: `/yui/comment/${mainId}/list`,
        method: 'get',
    })

}
