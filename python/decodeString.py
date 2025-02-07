class Solution(object):
    def decodeString(self, s):
        """
        :type s: str
        :rtype: str
        """
        stack = []
        numStack = []
        res = ""
        digitSet = set("0123456789")
        currentCount = ""
        currentStr = ""
        size = len(s)
        i = 0

        while i < size:
            char = s[i]
            print(char)
            print('numStack: ', numStack)
            print('counter Str: ',currentCount)
            print('currentStr: ', currentStr)
            print('stack: ', stack)
            print('res: ', res)
            print('-----------')
            if char in digitSet:
                currentCount += char
                
                if currentStr:
                    stack.append(currentStr)
                    currentStr = ""
                    
            elif char == '[':
                numStack.append(int(currentCount))
                currentCount = ""
                
            elif char == ']':
            
                multiplier = numStack.pop()
                print('multiplier: ', multiplier)
                print('stack: ', stack)
                print('----')
                if stack:
                    val = stack.pop()
                    print('val: ', val)
                    print('----')
                    currentStr = val + currentStr * multiplier
                    stack.append(currentStr)
                    
                else:
                    res += currentStr * multiplier
                currentStr = ""
                
            else:
                currentStr += char
            
            i += 1
        
        print(res,'res')
        return res


testCases = [
    # "3[a]2[bc]",
    "3[a2[c]]",
    # "2[abc]3[cd]ef",
    # "abc3[cd]xyz",
    # "100[leetcode]"
]
solutions = [
    # "aaabcbc",
    "accaccacc",
    # "abcabccdcdcdef",
    # "abccdcdcdxyz",
    # "leetcode" * 100
]

for i, testCase in enumerate(testCases):
    solution = Solution().decodeString(testCase)
    print(solution == solutions[i], solution)