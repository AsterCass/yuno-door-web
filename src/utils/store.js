import {LocalStorage} from 'quasar'
import {updateLogin} from "@/utils/share-data"

const LOGIN_LOCAL_KEY = "yui-user-data"

export function isLogin() {
    const isLoginStatus = LocalStorage.has(LOGIN_LOCAL_KEY)
    //todo call backend is login
    updateLogin(isLoginStatus)
    return isLoginStatus

}

export function getLoginData() {
    return LocalStorage.getItem(LOGIN_LOCAL_KEY)
}

export function setLoginData(data) {
    LocalStorage.set(LOGIN_LOCAL_KEY, data)
    updateLogin(true)
}

export function logout() {
    updateLogin(false)
    LocalStorage.remove(LOGIN_LOCAL_KEY)
}