import {defineStore} from 'pinia'


export function updateLogin(currentLoginStatus) {
    userLogin().updateLoginStatus(currentLoginStatus)
}

export const userLogin = defineStore('yui-user-login', {
    state: () => ({isLogin: false}),
    getters: {},
    actions: {
        updateLoginStatus(status) {
            this.isLogin = status
        }
    },
})