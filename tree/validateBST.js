function TreeNode (val, left, right=null) {
    this.val = val
    if (!left) {
      this.left = left;
    }
    this.right = right
  }

  
const isNodeValid = (treeNode, max, min) => {
    if (!treeNode) {
      return true;
    }
    const isRightValid = treeNode.val < max;
    const isLeftValid = treeNode.val > min;
    if (isLeftValid && isRightValid) {
      return isNodeValid(treeNode.left, treeNode.val, min) && isNodeValid(treeNode.right, max, treeNode.val);
    } else {
      return false;
    }
}
var isValidBST = function(root) {
  if (!root) {
    return true;
  }
  return isNodeValid(root, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
};


/*
            5
          1    4
             3    6


*/
const nodes = {};
[1,2,3,4,5,6,7, 8, 9, 10].forEach((node) => {
  nodes[node] = new TreeNode(node);
});

nodes[5].left = nodes[4];
nodes[5].right = nodes[6]
nodes[6].right = nodes[7];
// nodes[6].left = nodes[3];


console.log(isValidBST(nodes[5]));
console.log(isValidBST(null));