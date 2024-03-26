import {date} from "quasar";


function singleDateTimeBuilder(obj, nowDateTime) {
    let sendDateTime = new Date(obj.sendDate).getTime()
    let waitSec = (nowDateTime - sendDateTime) / 1000
    console.log(sendDateTime, waitSec)
    if (waitSec < 60) {
        obj.webChatLabel = "刚刚"
    } else if (waitSec < 3600) {
        obj.webChatLabel = Math.floor(waitSec / 60) + "分钟前"
    } else if (waitSec < 3600 * 3) {
        obj.webChatLabel = Math.floor(waitSec / 3600) + "小时前"
    } else if (waitSec < 3600 * 24) {
        obj.webChatLabel = date.formatDate(sendDateTime, 'HH:mm')
    } else {
        obj.webChatLabel = date.formatDate(sendDateTime, 'YYYY-MM-DD HH:mm')
    }
}

export function messageTimeLabelInput(list, obj) {
    if (list) {
        let nowDateTime = new Date()
        if (0 === list.length) {
            singleDateTimeBuilder(obj, nowDateTime);
            list.push(obj)
        } else {
            let lastSendDateTime = new Date(list[list.length - 1].sendDate).getTime()
            let waitLastSec = (nowDateTime - lastSendDateTime) / 1000
            if (waitLastSec < 600) {
                obj.webChatLabel = ""
            } else {
                singleDateTimeBuilder(obj, nowDateTime);
            }
            list.push(obj)
        }
    }
}

export function messageTimeLabelBuilder(list) {
    if (!list || 0 === list.length) {
        return
    }
    let nowDateTime = new Date()
    let lastIndex = list.length - 1
    for (let count = lastIndex; count >= 0; --count) {
        let sendDateTime = new Date(list[count].sendDate).getTime()
        let waitLastSec = null
        let waitSec = (nowDateTime - sendDateTime) / 1000
        if (count < lastIndex) {
            let lastSendDateTime = new Date(list[count + 1].sendDate).getTime()
            waitLastSec = (lastSendDateTime - sendDateTime) / 1000
        }
        if (waitSec < 60) {
            list[count].webChatLabel = "刚刚"
        } else if (waitSec < 3600) {
            list[count].webChatLabel = Math.floor(waitSec / 60) + "分钟前"
        } else if (waitSec < 3600 * 3) {
            list[count].webChatLabel = Math.floor(waitSec / 3600) + "小时前"
        } else if (waitSec < 3600 * 24) {
            list[count].webChatLabel = date.formatDate(sendDateTime, 'HH:mm')
        } else {
            list[count].webChatLabel = date.formatDate(sendDateTime, 'YYYY-MM-DD HH:mm')
        }
        if (waitLastSec && waitLastSec < 600) {
            list[count + 1].webChatLabel = ""
        }
    }

}