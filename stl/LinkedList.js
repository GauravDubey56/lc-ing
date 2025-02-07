const { ListNode } = require("./ListNode");
const transformInput = (list) => {
  if (!list.length) {
    return null;
  }
  const head = new ListNode(list[0]);
  let itr = head;
  for (let i = 1; i < list.length; i++) {
    const node = new ListNode(list[i]);
    itr.next = node;
    itr = node;
  }
  return head;
};
class LinkedList {
  #head;
  /**
   *
   * @param {ListNode | number[]} head
   */
  constructor(head) {
    if (Array.isArray(head)) {
      this.#head = transformInput(head);
    } else {
      this.#head = head;
    }
  }
  toArray() {
    let itr = this.#head;
    const res = [];
    while (itr) {
      res.push(itr.val);
      itr = itr.next;
    }
    return res;
  }
  getHead() {
    return this.#head;
  }
}
module.exports.LinkedList = LinkedList;
