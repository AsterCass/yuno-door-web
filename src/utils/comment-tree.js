export function commentTree2TwoLevelTree(tree) {
    let twoLevelTree = [];
    for (let comment of tree) {
        let commentJson = JSON.stringify(comment);
        let newComment = JSON.parse(commentJson);
        newComment.childData = [];
        twoLevelTreeAddNode(comment, newComment)
        packageComment(newComment)
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
    packageComment(curNode)
    return curNode
}

export function packageComment(comment) {
    if (!comment.commentUserAvatar) {
        comment.commentUserAvatar = "https://picsum.photos/100/100"
    }
    if (!comment.commentUserName) {
        comment.commentUserName = "NotLoginUser"
    }

    if (!comment.ipAddressName) {
        comment.ipAddressName = "未知"
    }


}