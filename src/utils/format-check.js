function checkEnAndNum(str) {
    const reg = new RegExp(`^[0-9a-zA-Z]*$`)
    return reg.test(str)
}

function checkNormalCode(str) {
    const reg = new RegExp(`^[!-~]*$`)
    return reg.test(str)
}

function checkLength(str, min, max) {
    let checkResult = false
    if (null != str) {
        checkResult = str.length >= min && str.length <= max
    }
    console.log(checkResult)
    return checkResult
}

function checkIsMail(str) {
    const reg = new RegExp(`^(([^<>()/\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()/\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@` +
        `((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`)
    return reg.test(str) && checkNormalCode(str)
}

function checkIsPasswd(str) {
    return checkLength(str, 8, 20) && checkNormalCode(str)
}

function checkAccount(str) {
    return checkEnAndNum(str) && checkLength(str, 8, 20)
}

function checkTrue() {
    return true
}


export {
    checkIsMail, checkIsPasswd, checkAccount, checkTrue
}