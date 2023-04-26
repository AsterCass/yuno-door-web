function addStyle(style) {
    let nowStyle = document.querySelector('body').getAttribute('style')
    let newStyle
    if (null != nowStyle) {
        newStyle = nowStyle + ";" + style;
    } else {
        newStyle = style
    }
    document.querySelector('body').setAttribute('style', newStyle)
}

function removeStyle(style) {
    let nowStyle = document.querySelector('body').getAttribute('style')
    let newStyle = nowStyle.replaceAll(";" + style, "")
        .replaceAll(style + ";", "")
    document.querySelector('body').setAttribute('style', newStyle)
}

export {
    addStyle, removeStyle
}