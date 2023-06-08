import {getVideoBarrage} from "@/api/barrage";


export default {
    send: (options) => {
        options.error("暂时不支持弹幕发送");
        options.success();
    },

    read: (options) => {
        getVideoBarrage(options.url).then((response) => {
            const data = response;
            if (!data || 200 !== data.status) {
                options.error && options.error("弹幕数据加载失败");
                return;
            }
            options.success && options.success(data.data);
        }).catch((e) => {
            console.error(e);
            options.error && options.error();
        });
    },

};