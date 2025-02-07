var firstUniqChar = function(s) {
    const charMap = new Map();
    for (let i = 0; i < s.length; i++) {
        const val = s[i];
        const mapVal = charMap.get(val);
        if (mapVal) {
            mapVal.freq++;
        } else {
            charMap.set(val, {freq: 1, idx: i})
        }
    }
    const res = Array.from(charMap?.values()).find((val) => val.freq === 1)?.idx;
    return res || res == 0 ? res : -1;
};

const str = "eett";
console.log(firstUniqChar(str)); // 0


