const articleTagEnums = [
    {
        name: "Docker",
        code: 1,
        color: "blue-5",
        rbg: "#42A5F5",
    },
    {
        name: "Linux",
        code: 2,
        color: "red-5",
        rbg: "#EF5350",

    },
    {
        name: "Java",
        code: 4,
        color: "green-5",
        rbg: "#66BB6A",
    },
    {
        name: "C/C++",
        code: 8,
        color: "grey-10",
        rbg: "#212121",
    },
    {
        name: "SQL",
        code: 16,
        color: "orange-5",
        rbg: "#FFA726",
    },
    {
        name: "Windows",
        code: 32,
        color: "blue-grey-5",
        rbg: "#78909C",
    },
    {
        name: "Shell",
        code: 64,
        color: "purple-5",
        rbg: "#AB47BC",
    },
]

function getArticleTagDesc(code) {
    return articleTagEnums[Math.log2(code)]
}

function getArticleTagDescList(code) {
    let descList = []
    if (null !== code && 0 !== code.length) {
        code.forEach((item) => {
            descList.push(getArticleTagDesc(item))
        })
    }
    return descList

}


export {
    articleTagEnums, getArticleTagDesc, getArticleTagDescList
}