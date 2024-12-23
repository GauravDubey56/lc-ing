const { TreeNode } = require("../stl/treeNode");

const inOrder = (root) => {
  if (!root) {
    return [];
  }
  if (!root instanceof TreeNode) {
    throw new Error("Invalid input");
  }
  const left = inOrder(root.left);
  const right = inOrder(root.right);
  return [...left, root.val, ...right];
};

const LIST = [1, 3, 5, 6, 7, 8, 9];

const getIndices = (start, end) => {
  return Math.ceil((start + end) / 2);
};
const sortedArrayToBSTUtil = (nums, start, end) => {
  if (start > end) {
    return null;
  }
  const midIndex = getIndices(start, end);
  const value = nums[midIndex];
  const treeNode = new TreeNode(value);
  treeNode.left = sortedArrayToBSTUtil(nums, start, midIndex - 1);
  treeNode.right = sortedArrayToBSTUtil(nums, midIndex + 1, end);
  return treeNode;
};

const sortedArrayToBST = (nums) => {
  if (!Array.isArray(nums)) {
    return null;
  }
  if (!nums.length) {
    return null;
  }
  const root = sortedArrayToBSTUtil(nums, 0, nums.length - 1);
  return root;
};

const rootNode = sortedArrayToBST(LIST);
console.log(inOrder(rootNode));
