const { MinHeap } = require("../stl/MinHeap.js");

const arr = [3, 2, 1, 5, 6, 4];
const k = 2;


const findKthLargest = (nums, k) => {
    const minHeap = new MinHeap();
    for (let i = 0; i < nums.length; i++) {
        minHeap.push(nums[i]);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }
    return minHeap.peek();
}

console.log(findKthLargest(arr, k)); // 5