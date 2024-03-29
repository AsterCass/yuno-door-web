import {extend, LocalStorage} from 'quasar'
import {userDetail, userIsLogin, userLogout} from "@/api/user";
import emitter from "@/utils/bus";

const LOGIN_LOCAL_KEY = "yui-user-data"
const LOGIN_TOKEN_KEY = "User-Token"
const CURRENT_PLAY_VIDEO = "cur-video-data"
const PERSON_VIDEO_SETTING = "person-video-setting"
const PERSON_CHATTING_READ = "person-chatting-read"
const PERSON_CHATTING_DETAIL = "person-chatting-detail"


//============================== local chat ==============================

export function savePersonChattingDetail(data) {
    let oldData = getPersonChattingDetail()
    LocalStorage.set(PERSON_CHATTING_DETAIL, extend(true, oldData, data))
    return getPersonChattingDetail()
}

export function getPersonChattingDetail() {
    let personChattingDetail = LocalStorage.getItem(PERSON_CHATTING_DETAIL)
    if (!personChattingDetail) {
        personChattingDetail = {showGAR: true}
    }
    return personChattingDetail
}


export function savePersonChattingRead(chatId, lastMsgId) {
    let chattingReadMap = getPersonChattingRead()
    chattingReadMap.set(chatId, lastMsgId)
    LocalStorage.set(PERSON_CHATTING_READ, JSON.stringify(Object.fromEntries(chattingReadMap)))
}

export function getPersonChattingRead() {
    const chattingReadMapStr = LocalStorage.getItem(PERSON_CHATTING_READ)
    let chattingReadMap = new Map()
    if (chattingReadMapStr) {
        const jsonObj = JSON.parse(chattingReadMapStr)
        chattingReadMap = new Map(Object.entries(jsonObj))
    }
    return chattingReadMap
}

//============================== video ==============================

export function addCurVideoSetting(data) {
    let oldData = getCurVideoSetting()
    LocalStorage.set(PERSON_VIDEO_SETTING, extend(true, oldData, data))
    return getCurVideoData()
}

export function getCurVideoSetting() {
    let videoSetting = LocalStorage.getItem(PERSON_VIDEO_SETTING)
    if (!videoSetting) {
        videoSetting = {}
    }
    return videoSetting
}

export function addCurVideoData(data) {
    let oldData = getCurVideoData()
    LocalStorage.set(CURRENT_PLAY_VIDEO, extend(true, oldData, data))
    return getCurVideoData()
}

export function getCurVideoData() {
    let videoData = LocalStorage.getItem(CURRENT_PLAY_VIDEO)
    if (!videoData) {
        videoData = {}
    }
    return videoData
}

//============================== login web ==============================

export function setWebLoginData(data, userToken) {
    LocalStorage.set(LOGIN_LOCAL_KEY, data)
    LocalStorage.set(LOGIN_TOKEN_KEY, userToken)
}

export function webIsLogin() {
    const hasLoginData = LocalStorage.has(LOGIN_LOCAL_KEY)
    const hasLoginToken = LocalStorage.has(LOGIN_TOKEN_KEY)
    return hasLoginData && hasLoginToken
}

export function webLogout() {
    const currentWebIsLogin = webIsLogin();
    LocalStorage.remove(LOGIN_LOCAL_KEY)
    LocalStorage.remove(LOGIN_TOKEN_KEY)
    if (currentWebIsLogin) {
        emitter.emit("loginMessageEvent", false)
    }
}

export function getWebLoginToken() {
    return LocalStorage.getItem(LOGIN_TOKEN_KEY)
}

export function getWebLoginData() {
    let loginData = LocalStorage.getItem(LOGIN_LOCAL_KEY)
    if (!loginData) {
        loginData = {}
    }
    return loginData
}

//============================== login server ==============================

export function logout(id) {
    userLogout(id).then(res => {
        LocalStorage.remove(LOGIN_LOCAL_KEY)
        LocalStorage.remove(LOGIN_TOKEN_KEY)
        if (200 === res.data.status) {
            emitter.emit("loginMessageEvent", false)
        }
    })
}

export function focusUpdateWebUserData(needReload) {
    serviceIsLogin().then(isLogin => {
        if (!isLogin) {
            webLogout()
        } else {
            userDetail().then(res => {
                if (200 === res.data.status) {
                    res.data.data.needReload = needReload
                    LocalStorage.set(LOGIN_LOCAL_KEY, res.data.data)
                    emitter.emit("refreshLoginMessageEvent", res.data.data)
                }
            })
        }
    })
}

export async function serviceIsLogin() {
    const result = await userIsLogin()
    return result.data.data
}



