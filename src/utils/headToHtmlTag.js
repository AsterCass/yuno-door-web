export function headToHtmlTag(heads) {

    heads = [
        {
            level: 2,
            value: "前言"
        },
        {
            level: 2,
            value: "CICD配置"
        },
        {
            level: 3,
            value: "docker-compose.yml"
        },
        {
            level: 3,
            value: "Dockerfile"
        },
        {
            level: 3,
            value: "gitlab-ci.yml"
        },
        {
            level: 2,
            value: "nginx配置"
        },
    ]

    let headTags = []
    if (null !== heads && undefined !== heads) {
        for (let index in heads) {
            let headTag = {}
            headTag.level = heads[index].level
            headTag.value = heads[index].value.replace(".", "").toLowerCase()
            headTags.push(headTag)
        }
    }
    return headTags
}

