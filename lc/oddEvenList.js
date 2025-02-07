const { ListNode } = require("../stl/ListNode");

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const printList = (head) => {
    let temp = head;
    const res = [];
    while (temp) {
        res.push(temp.val);
        temp = temp.next
    }
    console.log(res);
    return res;
};
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function(head) {
    if (!head || !head.next) {
        return head;
    }
    let odd = head;
    let even = head.next;  
    let evenHead = head.next;
    while (even.next) {
        odd.next = even.next;
        odd = odd.next;
        even.next = odd.next;
        even = even.next;
        if (!even) {
            break;
        }
    }
    odd.next = evenHead;
    return head;
};

const arr = [1, 2, 3];
const obj = {};
arr.forEach((i, idx) => {
    obj[i] = new ListNode(i);
    if (idx) {
        obj[i-1].next = obj[i];
    }
});
printList(obj[1]);

const newHead = oddEvenList(obj[1]);
printList(newHead);