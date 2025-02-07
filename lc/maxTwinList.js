const { LinkedList } = require("../stl/LinkedList");
const { ListNode } = require("../stl/ListNode");
const { Reader } = require("../stl/reader");

async function processInput() {
  const reader = new Reader();
  const readLine = reader.input;
  let T = parseInt(await readLine());
  const tests = [];
  for (let t = 0; t < T; t++) {
    let N = parseInt(await readLine());

    let data = [];
    let val = await readLine()
    val.split(" ").forEach((e) => {
        data.push(Number(e));
    });
    
    tests.push({
        n: N,
        list: data
    });
  }

  reader.close();
  return tests;
}

/**
 * 
 * @param {number[]} list 
 * @returns {ListNode}
 */
const createLinkedList = (list) => {
    const linkedList = new LinkedList(list);
    return linkedList.getHead();
}
/**
 * 
 * @param {number[]} list 
 * @returns {ListNode}
 */

const main = async () => {
    const input = await processInput();
    input.forEach((test) => {
        const llhead = createLinkedList(test.list);
        const response = pairSum(llhead);
        console.log(response);
    })
}

main();

/**
 * 
 * @param {ListNode} head 
 * @returns {ListNode}
 */
const reverseList = (head) => {
    let curr = head, prev = null, next;
    while (curr) {
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
/**
 * 
 * @param {ListNode} head 
 * @returns {ListNode}
 */
const getMiddleNode = function(head) {
    let fast = head, slow = head;
    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
    }
    return slow;
};

/**
 * @param {ListNode} head
 * @return {number}
 */
var pairSum = function(head) {
    let midHead = getMiddleNode(head);
    midHead = reverseList(midHead);
    let max = Number.NEGATIVE_INFINITY;
    let temp = head, midTemp = midHead;
    while (midTemp) {
        const twinSum = temp.val + midTemp.val;
        max = Math.max(twinSum, max);
        temp = temp.next;
        midTemp = midTemp.next;
    }
    return max;
};
