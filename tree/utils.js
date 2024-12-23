const inorderRecursive = (node, list) => {
    if (!node) {
        return;
    }
    inOrderTraversal(node.left, list);
    list.push(node.val);
    inOrderTraversal(node.right, list);
}
const inOrderTraversal = (root) => {
    
}