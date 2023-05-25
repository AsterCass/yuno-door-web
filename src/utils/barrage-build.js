import {getVideoBarrage} from "@/api/barrage";


export default {
    send: (options) => {
        options.error("暂时不支持弹幕发送");
        options.success();
    },

    read: (options) => {
        getVideoBarrage("2342432").then((response) => {
            const data = response.data;
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