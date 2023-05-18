import {serviceShiro} from '@/utils/request'


export function getAllVideoCol(param) {
    return serviceShiro({
        url: `/ushio/videoCol/list`,
        method: 'get',
        param: param,
    })
}
