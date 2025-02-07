function ListNode(val) {
  this.val = val;
  this.next = null;
}
var reverseList = function (head) {
  let curr = head,
    prev = null,
    next;

  while (curr) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
};

const printList = (node) => {
  if (!node) return;
  if (!node instanceof ListNode) return;
  const list = [];
  let curr = node;
  while (curr) {
    list.push(curr.val);
    curr = curr.next;
  }
  console.log(list);
};

const nodes = {};
[1, 2, 3, 4, 5].forEach((val) => {
  nodes[val] = new ListNode(val);
});
const head = nodes[1];
[1, 2, 3, 4].forEach((val) => {
  nodes[val].next = nodes[val + 1];
});
printList(head);
const reversed = reverseList(head);
printList(reversed);
