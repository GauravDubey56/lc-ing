/**
 * @param {number[]} nums
 */
var Solution = function (nums) {
    this.original = [];
    nums.forEach((val) => {
        this.original.push(val);
    });
};

/**
 * @return {number[]}
 */
Solution.prototype.reset = function () {
    return this.original;
};

/**
 * @return {number[]}
 */
Solution.prototype.shuffle = function () {
    
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */
