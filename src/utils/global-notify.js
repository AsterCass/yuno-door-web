function notifyTopRightWarning(msg, time, notify) {
    notify({
        message: msg,
        position: 'top-right',
        type: 'warning',
        timeout: time
    })
}


export {
    notifyTopRightWarning
}