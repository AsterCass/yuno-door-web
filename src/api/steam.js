import {serviceShiro} from '@/utils/request'


export function gameDetail(steamId) {
    return serviceShiro({
        url: `/nezuko/steam/game/${steamId}/detail`,
        method: 'get',
    })
}

export function searchGames(name) {
    return serviceShiro({
        url: `/nezuko/steam/game/search`,
        method: 'get',
        params: name
    })
}

export function getPopularGames() {
    return serviceShiro({
        url: `/nezuko/steam/game/popular`,
        method: 'get',
    })
}
