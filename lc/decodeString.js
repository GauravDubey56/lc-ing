// 3[a2[bc]d] => abcbcd,abcbcd,abcbcd
const decodeString = (str) => {
  const digitSet = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

  const strStack = [];
  const numStack = [];

  let currentCount = "";
  let currentStr = "";
  const size = String(str).length;
  for (let i = 0; i < size; i++) {
    const char = str[i];
    if (digitSet.has(char)) {
      currentCount += char;
    } else if (char == "[") {
      numStack.push(Number(currentCount))
      currentCount = "";
      strStack.push(currentStr);
      currentStr = "";
    } else if (char == "]") {
      const numTop = numStack.pop();
      const strTop = strStack.pop();
      
      currentStr = strTop + String(currentStr).repeat(numTop);
    } else {
      currentStr += char;
    }
  }
  console.log(strStack);
  return currentStr;
};

const testCases = [
    "3[a]2[bc]ef",
  //   "3[a2[c]bd]ef",
  //   "2[abc]3[cd]ef",
  "abc3[cd]xyz",
  "3[z]2[2[y]pq4[2[jk]e1[f]]]ef",
  //   "100[leetcode]",
  //   "31[a2[bc]d]",
];
const solutions = [
    "aaabcbcef",
  //   "accbdaccbdaccbdef",
  //   "abcabccdcdcdef",
  "abccdcdcdxyz",
  "zzzyypqjkjkefjkjkefjkjkefjkjkefyypqjkjkefjkjkefjkjkefjkjkefef",
  //   "leetcode".repeat(100),
  //   "abcbcdabcbcdabcbcd",
];

for (let i = 0; i < testCases.length; i++) {
  const result = decodeString(testCases[i]);
  if (result === solutions[i]) {
    continue;
  }
  console.log({
    result,
    expected: solutions[i],
    passed: result === solutions[i],
  });
}

