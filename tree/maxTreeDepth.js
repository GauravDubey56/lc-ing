function TreeNode (val, left, right=null) {
  this.val = val
  if (!left) {
    this.left = left;
  }
  this.right = right
}

const maxDepthCalculator = (currentNode, currentDepth) => {
  if (!currentNode) {
    return 0;
  }
  return 1 + Math.max(maxDepthCalculator(currentNode.right, currentDepth), maxDepthCalculator(currentNode.left, currentDepth))
}
const maxDepth = (root) => {
  return maxDepthCalculator(root, 0);
}



/*
            1
          2    3
        4   5   6
          7


*/
const nodes = {};
[1,2,3,4,5,6,7].forEach((node) => {
  nodes[node] = new TreeNode(node);
});

nodes[1].left = nodes[2];
nodes[1].right = nodes[3]
nodes[2].left = nodes[4];
nodes[2].right = nodes[5];
nodes[3].right = nodes[6];
nodes[5].right = nodes[7];

console.log(maxDepth(nodes[1]));
console.log(maxDepth(null));