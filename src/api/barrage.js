import {serviceShiro} from '@/utils/request'

export function getVideoBarrage(videoId) {
    return serviceShiro({
        url: `/yui/barrage/list?id=${videoId}`,
        method: 'get',
    })
}
