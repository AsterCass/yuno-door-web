export const genderOptEnum = [
    {
        label: '女',
        category: 0
    },
    {
        label: '男',
        category: 1
    },
    {
        label: '中性',
        category: 2
    },
    {
        label: '偏男两性人',
        category: 3
    },
    {
        label: '偏女两性人',
        category: 4
    },
    {
        label: '不完全男性',
        category: 5
    },
    {
        label: '不完全女性',
        category: 6
    },
    {
        label: '武装直升飞机',
        category: 7
    },
]

export function getGenderObj(category) {
    for (let obj of genderOptEnum) {
        if (obj.category === category) {
            return obj
        }
    }
    return {
        label: "",
        category: 0
    }
}