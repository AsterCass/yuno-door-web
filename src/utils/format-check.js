export const notAllowStr = "'/\\?:*\"<>| "


function hasSameCharacter(str1, str2) {
    return new Set(str1).size + new Set(str2).size !== new Set(str1 + str2).size;
}

function checkAllowChar(str) {
    let result = true;
    if (null != str && 0 !== str.length) {
        result = !hasSameCharacter(notAllowStr, str)
    }
    return result

}

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

function checkNickName(str) {
    return checkAllowChar(str) && checkLength(str, 0, 20)
}

function checkName(str) {
    return checkAllowChar(str) && checkLength(str, 0, 10)
}

function checkMotto(str) {
    return checkLength(str, 0, 50)
}

function checkTrue() {
    return true
}


export {
    checkIsMail, checkIsPasswd, checkAccount,
    checkMotto, checkNickName, checkName,
    checkTrue,
}