const { Queue } = require("../stl/queue");



function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// var levelOrder = function (root) {
//     const response = [];
//     if (!root) {
//         return response;
//     }
//     const q = new Queue(root);
//     let curr = [];
//     while (!q.isEmpty()) {
//         const front = q.pop();
//         if (! front instanceof TreeNode) {
//             throw new Error('Invalid element');
//         }
//         curr.push(front.val);
//         if (front.left) {
//             q.add(front.left);
//         } else if (front.right) {
//             q.add(front.right);
//         } else {
//             response.push(curr);
//             curr = [];
//         }
//     }
//     return response;
// };

const addToLevel = (level, width, node, levelsMap) => {
    if (!node) {
        return;
    }
    const levelValue = levelsMap.get(level) || [];
    levelValue.push({width, val: node.val});
    levelsMap.set(level, levelValue);
    addToLevel(level+1, width-1, node.left, levelsMap);
    addToLevel(level+1, width+1, node.right, levelsMap);
}
var levelOrder = function (root) {
    const levelsMap = new Map();
    addToLevel(0, 0, root, levelsMap);
    for (const [ ,levelList] of levelsMap) {
        levelList.sort((a, b) => a.width - b.width);
    }
    return Array.from(levelsMap.values()).map(e => e.map(v => v.val))
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
root2.right = new TreeNode(3);
root2.left.right = new TreeNode(4);
root2.right.right = new TreeNode(5);
root2.right.right.left = new TreeNode(6);

// Function to test
// console.log(levelOrder(root)); 
console.log(levelOrder(root2));


/*
            1
        2       2
          3        3
                

*/