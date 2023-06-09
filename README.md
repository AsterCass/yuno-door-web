# admin-door

## 网站说明

## 功能支持

## 项目结构

## 包引用

## 注意事项

1. dPlayer的patch
    1. 删除视频右击菜单栏默认选项
    2. 删除默认日志打印提示
    3. 删除视频控制台下`<label for="">`浏览器报错相关代码，其实整个控制台除了进度条可以删除，
       但是一些div和js逻辑有联动会导致项目报错，所以只删除label相关代码
    4. 修改apiUrl的生成逻辑，代码位置：`[]).slice(0);`
       文件位置：[danmaku.js](https://github.com/DIYgod/DPlayer/blob/master/src/js/danmaku.js)，
       修改为apiUrl不使用奇怪的自定义生成逻辑，直接返回videoId
    5. 暂无
