import {serviceShiro} from '@/utils/request'


export function getBlogContent(path) {
    return serviceShiro({
        url: `/kotomi/article/${path.id}/content`,
        method: 'get',
        responseType: "blob"
    })
}

export function getBlogMeta(path) {
    return serviceShiro({
        url: `/kotomi/article/${path.id}/meta`,
        method: 'get',
    })
}

export function getBlogList(param) {
    return serviceShiro({
        url: `/kotomi/article/list`,
        method: 'get',
        params: param
    })
}

export function health() {
    return serviceShiro({
        url: `/kotomi/asGo/health`,
        method: 'get',
    })
}

