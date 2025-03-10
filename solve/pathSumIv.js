function TreeNode(val, left, right) {
  this.left = left || null;
  this.right = right || null;
  this.val = val;
}
const decodeNum = (num) => ({
  h: Number(num[0]),
  p: Number(num[1]),
  v: Number(num[2]),
});
const buildTree = (nums) => {
  const n = nums.length;
  const maxDepth = Number(String(nums[n - 1])[0]);
  const matrix = [];
  let start = 0;
  for (let i = 1; i <= maxDepth; i++) {
    const level = [];
    let j = start;
    let k = 1; // track position
    let levelCount = Math.pow(2, i - 1);

    while (k <= levelCount) {
      const str = String(nums[j]);
      if (str[1] == k && str[0] == i) {
        level.push(Number(str[2]));
        j++;
      } else {
        level.push(null);
      }
      k++;
    }
    start = j;
    matrix.push(level);
  }
  return matrix;
};

const isLeaf = (node) => !node?.right && !node?.left;

const calculateSum = (node, curr, res) => {
  if (isLeaf(node)) {
    res.sum += curr + node.val;
    return;
  }

  calculateSum(node.left, curr + node.val, res);
  calculateSum(node.right, curr + node.val, res);
};

const isLeafEle = (tree, h, l, r) => {
  const isNullEle = (i) =>
    tree?.[h]?.[i] === null || tree?.[h]?.[i] === undefined;
  return isNullEle(l) && isNullEle(r);
};

const calculateSumFromMat = (curr, tree, h, i, res) => {
  const val = tree[h][i];
  if (val == null || val == undefined) {
    return;
  }
  const l = 2 * i;
  const r = l + 1;
  if (isLeafEle(tree, h + 1, l, r)) {
    curr += val;
    res.sum += curr;
    return;
  }
  calculateSumFromMat(curr + val, tree, h + 1, l, res);
  calculateSumFromMat(curr + val, tree, h + 1, r, res);
};
const createTree = (tree, h, i, node, conn) => {
  const val = tree?.[h]?.[i];
  if (val === null || val === undefined) {
    node[conn] = null;
    return;
  }
  const currentNode = new TreeNode(val);

  if (conn !== "") {
    node[conn] = currentNode;
  }

  const l = 2 * i;
  const r = l + 1;

  createTree(tree, h + 1, l, currentNode, "left");
  createTree(tree, h + 1, r, currentNode, "right");
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var pathSum = function (nums) {
  const mat = buildTree(nums);
  console.log(mat);
  const res = { sum: 0 };
//   const root = new TreeNode(mat[0][0]);
//   createTree(mat, 1, 0, root, "left");
//   createTree(mat, 1, 1, root, "right");

//   calculateSum(root, 0, res);

  calculateSumFromMat(0, mat, 0, 0, res);

  return res.sum;
};

const s = pathSum([113,221]);
console.log({ s });
