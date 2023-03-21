export function headToHtmlTag(meta) {

    let heads = meta.articleChildTitleList;

    let headTags = []
    if (null !== heads && undefined !== heads) {
        for (let index in heads) {
            let headTag = {}
            //titleLevel
            headTag.titleLevel = heads[index].titleLevel
            //title
            headTag.title = ""
            let count = heads[index].titleLevel - 1
            while (count > 0) {
                headTag.title += "\xa0\xa0\xa0\xa0"
                --count
            }
            headTag.title += heads[index].title
            //value
            headTag.value = heads[index]
                .title.replace(".", "")
                .replace(/[@$]/g, "")
                .toLowerCase()
            headTags.push(headTag)
        }
    }
    return headTags


}

