import {extend, LocalStorage} from 'quasar'
import {updateLogin} from "@/utils/share-data"
import {userDetail, userIsLogin, userLogout} from "@/api/user";
import emitter from "@/utils/bus";

const LOGIN_LOCAL_KEY = "yui-user-data"
const LOGIN_TOKEN_KEY = "User-Token"
const CURRENT_PLAY_VIDEO = "cur-video-data"
const PERSON_VIDEO_SETTING = "person-video-setting"


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

export function webIsLogin() {
    const hasLoginData = LocalStorage.has(LOGIN_LOCAL_KEY)
    const hasLoginToken = LocalStorage.has(LOGIN_TOKEN_KEY)
    return hasLoginData && hasLoginToken
}

export async function serviceIsLogin() {
    const result = await userIsLogin()
    return result.data.data
}

export function isLogin() {
    serviceIsLogin().then(res => {
        let webIsLoginStatus = webIsLogin()
        let isLoginStatus = webIsLoginStatus && res
        let needSendEvent = webIsLoginStatus !== res
        if (!isLoginStatus) {
            logout()
        }
        updateLogin(isLoginStatus)
        if (needSendEvent) {
            emitter.emit("loginMessageEvent", isLoginStatus)
        }
    })
}

export function refreshLoginMessage() {
    serviceIsLogin().then(res => {
        let isLoginStatus = webIsLogin() && res
        if (!isLoginStatus) {
            logout()
            emitter.emit("refreshLoginMessageEvent", null)
        } else {
            let id = getLoginData().id
            userDetail(id).then(res => {
                if (200 === res.data.status) {
                    emitter.emit("refreshLoginMessageEvent", res.data.data)
                    LocalStorage.set(LOGIN_LOCAL_KEY, res.data.data)
                }
            })
        }
        updateLogin(isLoginStatus)
    })
}

export function getLoginData() {
    let loginData = LocalStorage.getItem(LOGIN_LOCAL_KEY)
    if (!loginData) {
        loginData = {}
    }
    return loginData
}

export function getLoginToken() {
    return LocalStorage.getItem(LOGIN_TOKEN_KEY)
}

export function setLoginData(data, userToken) {
    LocalStorage.set(LOGIN_LOCAL_KEY, data)
    LocalStorage.set(LOGIN_TOKEN_KEY, userToken)
    updateLogin(true)
}

export function logout(id) {
    userLogout(id).then(res => {
        updateLogin(false)
        LocalStorage.remove(LOGIN_LOCAL_KEY)
        LocalStorage.remove(LOGIN_TOKEN_KEY)
        if (200 === res.data.status) {
            emitter.emit("loginMessageEvent", false)
        }
    })
}