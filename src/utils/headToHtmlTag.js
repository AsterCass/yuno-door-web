export function headToHtmlTag(heads) {

    heads = [
        {
            level: 2,
            text: "前言"
        },
        {
            level: 2,
            text: "CICD配置"
        },
        {
            level: 3,
            text: "docker-compose.yml"
        },
        {
            level: 3,
            text: "Dockerfile"
        },
        {
            level: 3,
            text: "gitlab-ci.yml"
        },
        {
            level: 2,
            text: "nginx配置"
        },
    ]

    let headTags = []
    if (null !== heads && undefined !== heads) {
        for (let index in heads) {
            let headTag = {}
            //level
            headTag.level = heads[index].level
            //text
            headTag.text = ""
            let count = heads[index].level - 1
            while (count > 0) {
                headTag.text += "\xa0\xa0\xa0\xa0"
                --count
            }
            headTag.text += heads[index].text
            //value
            headTag.value = heads[index].text.replace(".", "").toLowerCase()
            headTags.push(headTag)
        }
    }
    return headTags
}

