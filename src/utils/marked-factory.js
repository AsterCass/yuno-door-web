import {marked} from "marked";
import {markedHighlight} from "marked-highlight";
import hljs from "highlight.js";
import {gfmHeadingId} from "marked-gfm-heading-id";

marked.use(markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
        //correct
        lang = lang === 'mysql' ? 'sql' : lang
        lang = lang === 'sh' ? 'powershell' : lang
        lang = lang === 'shell' ? 'powershell' : lang
        //convert
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, {language}).value;
    }
}));
marked.use(gfmHeadingId({}));
marked.use({
    mangle: false,
    headerIds: false
});

// 代码样式选择 https://highlightjs.org/static/demo/
const styleEnums = [
    'androidstudio', 'codepen-embed', 'felipec', 'hybrid', 'kimbie-dark', 'lioshi', 'nord',
    'panda-syntax-dark', 'paraiso-dark', 'srcery', 'stackoverflow-dark', 'tomorrow-night-bright', 'vs2015'
]

function importStyle() {
    const random = Math.floor(Math.random() * 10000)
    const randomStyle = styleEnums[random % styleEnums.length]
    import('../../node_modules/highlight.js/styles/' + randomStyle + '.css')
}

export {
    marked, importStyle
}