import {serviceShiro} from '@/utils/request'


export function getBlogContent(path) {
    return serviceShiro({
        url: `/article/${path.id}/content`,
        method: 'get',
        responseType: "blob"
    })
}

export function getBlogMeta(path) {
    return serviceShiro({
        url: `/article/${path.id}/meta`,
        method: 'get',
    })
}

export function getBlogList(param) {
    return serviceShiro({
        url: `/article/list`,
        method: 'get',
        params: param
    })
}

