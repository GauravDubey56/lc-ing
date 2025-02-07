// nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3

const arr1 = [-1,3,0,0,0,0,0];
const arr2 = [0,0,1,2,3];

// const arr1 = [0];
// const arr2 = [1];

/*
    1,2,3,4,6,0,0,0,0
    2,3,5,9

    1,2,3,4,6,0,0,0,9
    2,3,5,0


    1,2,2,3,3,4,5,6,9
    0,0,0,0

*/
// 1, 2, 2, 3, 3, 0, 0, 0, 0];
// 4, 5, 6, 9;

const swapAcross = (nums1, nums2, idx1, idx2) => {
  const tmp = nums1[idx1];
  nums1[idx1] = nums2[idx2];
  nums2[idx2] = tmp;
};
const swap = (nums1, idx1, idx2) => {
  const tmp = nums1[idx1];
  nums1[idx1] = nums1[idx2];
  nums1[idx2] = tmp;
};
const merge = (nums1, m, nums2, n) => {
  if (!Array.isArray(nums1) || !Array.isArray(nums2)) {
    return [];
  }
  if (!m) {
    nums1.forEach((_, index) => {
        nums1[index] = nums2[index];
    })
    return;
  }
  if (!nums2.length) {
    return;
  }
  let ctr1 = m - 1;
  ctr2 = n - 1;
  let lastIndex = m + n - 1;

  while (ctr2 >= 0) {
    if (nums1[ctr1] > nums2[ctr2]) {
      swap(nums1, ctr1, lastIndex);
      ctr1--;
    } else {
      swapAcross(nums1, nums2, lastIndex, ctr2);
      ctr2--;
    }
    lastIndex--;
  }
  console.log({ctr1, ctr2});
};

merge(arr1, arr1.filter((e) => e).length, arr2, arr2.length);
console.log(arr1);
