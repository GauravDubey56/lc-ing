function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
  let curr = node;
  while (true) {
    curr.val = curr.next.val;
    if (!curr?.next?.next) {
      curr.next = null;
      return;
    }
    curr = curr.next;
  }
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
}

const nodes = {
    4: new ListNode(4),
    5: new ListNode(5),
    1: new ListNode(1),
    9: new ListNode(9),
};
nodes[4].next = nodes[5];
nodes[5].next = nodes[1];
nodes[1].next = nodes[9];
const head = nodes[4];
printList(head)
deleteNode(nodes[1]);
printList(head);