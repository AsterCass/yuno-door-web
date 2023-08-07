import {marked} from "marked";
import {markedHighlight} from "marked-highlight";
import hljs from "highlight.js";
import {gfmHeadingId} from "marked-gfm-heading-id";

marked.use(markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
        //correct
        lang = lang === 'mysql' ? 'sql' : lang
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

export {
    marked
}