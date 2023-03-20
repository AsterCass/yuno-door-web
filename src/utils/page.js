import {extend} from 'quasar'

function simplePage(param, pageNo) {
    let pageParam = {}
    extend(true, pageParam, param)
    pageParam.offset = (pageNo - 1) * 10
    pageParam.limit = 10
    return pageParam
}

function customPage(param, offset, limit) {
    let pageParam = {}
    extend(true, pageParam, param)
    pageParam.offset = offset
    pageParam.limit = limit
    return pageParam
}


export {
    simplePage, customPage
}


