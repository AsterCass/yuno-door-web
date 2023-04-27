import {userLogin} from "@/api/user";
import {setLoginData} from "@/utils/store";
import emitter from "@/utils/bus";


function authLogin(account, passwd, notify) {
    //login body
    let currentBody = {accountMail: account, passwd: passwd}
    //login
    userLogin(currentBody).then(res => {
        const status = res.data.status
        if (200 !== status) {
            notify({
                message: res.data.message,
                position: 'top',
                type: 'negative',
                timeout: 1000
            })
            emitter.emit("loginMessageEvent", false)
        } else {
            notify({
                message: "登录成功",
                position: 'top-right',
                type: 'positive',
                timeout: 1000
            })
            setLoginData(res.data.data, res.headers.get("User-Token"))
            emitter.emit("loginMessageEvent", true)
        }
    })
}


export {
    authLogin
}