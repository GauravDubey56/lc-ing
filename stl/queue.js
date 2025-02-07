class Queue {
  #list = [];
  constructor(...args) {
    if (args?.length) {
      args.forEach((arg) => {
        this.#list.push(arg);
      });
    }
  }
  add(element) {
    this.#list.push(element);
  }
  enqueue(element) {
    this.add(element);
  }
  pop() {
    const value = this.#list[0];
    this.#list.shift();
    return value;
  }
  dequeue() {
    return this.pop();
  }
  front() {
   return this.peek();
  }
  peek() {
    return this.#list[0];
  }
  isEmpty() {
    return !this.#list?.length;
  }
  size() {
    return this.#list?.length;
  }
  clear() {
    this.#list.length = 0;
  }
}


module.exports.Queue = Queue;