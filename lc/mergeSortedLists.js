function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} prev
 * @param {ListNode} curr
 */
const linkNodes = (prev, curr) => {
    let terminal = curr.next;
    const next = prev.next;
    prev.next = curr;
    curr.next = next;
    return terminal;
}
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  const startNode = list1.val < list2.val ? list1 : list2;
  let curr1 = list1;
  let curr2 = list2;
  while (curr1.next && curr2.next) {
    console.log({
        curr1, curr2
    });
    if (curr1.val <= curr2.val) {
        curr2 = linkNodes(curr1, curr2);
    } else {
        curr1 = linkNodes(curr2, curr1);
    }
    printList(curr1);
    printList(curr2);
  }
  if (!curr1.next) {
    curr1.next = curr2;
  } 
  if (!curr2.next) {
    curr2.next = curr1;
  }
  return startNode;
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

const nodes1 = {}, nodes2 = {};
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((val) => {
  nodes1[val] = new ListNode(val);
  nodes2[val] = new ListNode(val);
});

let head1 = nodes1[1], head2 = nodes2[2];

nodes1[1].next = nodes1[3];
nodes1[3].next = nodes1[5];

nodes2[2].next = nodes2[4];
nodes2[4].next = nodes2[6];

const merged = mergeTwoLists(head1, head2);
printList(merged);

