function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */

const areLeavesSame = (node1, node2) => {
  if (!node1 && !node2) {
    return true;
  }
  if (!(node1 && node2)) {
    return false;
  }
  if (!(node1 instanceof TreeNode && node2 instanceof TreeNode)) {
    return false;
  }
  const isValSame = node1.val === node2.val;
  if (isValSame) {
    return (
      areLeavesSame(node1.left, node2.right) &&
      areLeavesSame(node1.right, node2.left)
    );
  }
  return false;
};
var isSymmetric = function (root) {
  if (!root) {
    return true;
  }
  if (!root instanceof TreeNode) {
    return true;
  }
  return areLeavesSame(root.left, root.right);
};

// Create a symmetric binary tree
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(2);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(4);
root.right.left = new TreeNode(4);
root.right.right = new TreeNode(3);

// Create an asymmetric binary tree
const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.right = new TreeNode(2);
root2.left.right = new TreeNode(3);
root2.right.right = new TreeNode(3);

// Function to test
console.log(isSymmetric(root)); // Should return true (symmetric)
console.log(isSymmetric(root2)); // Should return false (not symmetric)
