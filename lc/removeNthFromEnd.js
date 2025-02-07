function ListNode(val) {
  this.val = val;
  this.next = null;
}

var removeNthFromEnd = function (head, n) {
  let fast = head, counter = 1, slow;
  while (fast.next) {
    if (counter > n) {
        slow = slow.next;
    } else if (counter == n) {
        slow = head;
        counter++;
    } else {
        counter++;
    }
    fast = fast.next;
  }
  console.log({
    slow, fast
  })
  if (!slow) {
    if (!head.next) {
        head = null;
        return head;   
    }
    head.val = head.next.val;
    head.next = head.next.next;
  } else {
    slow.next = slow?.next?.next || null;
  }
  return head;
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
[1,2,3,4,5].forEach(val => {
    nodes[val] = new ListNode(val);
})
const head = nodes[1];
[1,2,3,4].forEach(val => {
    nodes[val].next = nodes[val+1];
})
printList(head);
removeNthFromEnd(head, 2);
printList(head);
