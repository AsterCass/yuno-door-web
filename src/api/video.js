import {serviceShiro} from '@/utils/request'


export function getAllVideoCol(param) {
    return serviceShiro({
        url: `/ushio/videoCol/list`,
        method: 'get',
        param: param,
    })
}

export function getAdminVideo(param) {
    return serviceShiro({
        url: `/ushio/videoCol/person/admin`,
        method: 'get',
        param: param,
    })
}

export function getPersonVideo(param) {
    return serviceShiro({
        url: `/ushio/videoCol/person`,
        method: 'get',
        param: param,
    })
}
