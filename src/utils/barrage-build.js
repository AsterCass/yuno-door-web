import {getVideoBarrage} from "@/api/barrage";

export default {
    send: (endpoint, danmakuData) => {
        console.log('假装通过 WebSocket 发送数据', danmakuData, endpoint.data);
    },

    read: (options, xxx) => {
        console.log(333, options, xxx)
        getVideoBarrage("2342432").then((response) => {
            const data = response.data;
            console.log(data)
            if (!data || 200 !== data.status) {
                options.error && options.error(data && data.msg);
                return;
            }

            options.success && options.success(data.data);



        }).catch((e) => {
            console.error(e);
            options.error && options.error();
        });
    },
};