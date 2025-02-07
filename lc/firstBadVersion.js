const getMid = (start, end) => start + Math.floor((end-start)/2);
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let start = 1,
      end = n;

    while (end > start) {
      let mid = getMid(start, end);
      if (isBadVersion(mid)) {
        end = mid;
      } else {
        start = mid + 1;
      }
    }
    return end;
  };
};

const badVersionGenerator = (badVersion) => {
    const isBadVersion = (val) => {
        return val >= badVersion
    }
    return isBadVersion;
}


const n = 2, badVersion = 1;

console.log(solution(badVersionGenerator(badVersion))(n));