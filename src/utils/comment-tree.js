export function commentTree2TwoLevelTree(tree) {
    let twoLevelTree = [];
    for (let comment of tree) {
        let commentJson = JSON.stringify(comment);
        let newComment = JSON.parse(commentJson);

        newComment.childData = [];
        twoLevelTreeAddNode(comment, newComment)

        twoLevelTree.push(newComment)
    }
    return twoLevelTree
}


function twoLevelTreeAddNode(curNode, needMountNode) {
    if (curNode.childData && 0 !== curNode.childData.length) {
        for (let childNode of curNode.childData) {
            needMountNode.childData.push(twoLevelTreeAddNode(childNode, needMountNode))
        }
    }
    return curNode
}