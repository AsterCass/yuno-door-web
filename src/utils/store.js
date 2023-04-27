import {LocalStorage} from 'quasar'
import {updateLogin} from "@/utils/share-data"
import {userDetail, userIsLogin, userLogout} from "@/api/user";
import emitter from "@/utils/bus";

const LOGIN_LOCAL_KEY = "yui-user-data"
const LOGIN_TOKEN_KEY = "User-Token"

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
        let isLoginStatus = webIsLogin() && res
        if (!isLoginStatus) {
            logout()
        }
        updateLogin(isLoginStatus)
        emitter.emit("loginMessageEvent", isLoginStatus)
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
    return LocalStorage.getItem(LOGIN_LOCAL_KEY)
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
        if (200 === res.data.status) {
            updateLogin(false)
            LocalStorage.remove(LOGIN_LOCAL_KEY)
            LocalStorage.remove(LOGIN_TOKEN_KEY)
        }
    })
}