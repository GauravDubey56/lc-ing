class Queue {
  #list;
  constructor(...args) {
    this.#list = [];
    if (args?.length) {
      args.forEach((arg) => {
        this.#list.push(arg);
      });
    }
  }
  front() {
    return this.#list[0];
  }
  pop() {
    if (this.isEmpty()) {
      throw new Error(`Queue is empty`);
    }
    const value = this.#list[0];
    this.#list.shift();
    return value;
  }
  add(value) {
    this.#list.push(value);
  }
  size() {
    return this.#list.length;
  }
  isEmpty() {
    return this.size() === 0;
  }
}

const MAX_INTERVAL = 3000;
class RecentCounter {
  #pingQueue;
  constructor() {
    this.#pingQueue = new Queue();
  }
  ping(timestamp) {
    this.#pingQueue.add(timestamp);
    const responseRange = [timestamp - MAX_INTERVAL, timestamp];
    const isWithinRange = (value) => {
      if (value === undefined) {
        return true;
      }
      return value >= responseRange[0] && value <= responseRange[1];
    };
    while (
      !this.#pingQueue.isEmpty() &&
      !isWithinRange(this.#pingQueue.front())
    ) {
      this.#pingQueue.pop();
    }
    return this.#pingQueue.size();
  }
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */

const main = () => {
  const calls = ["ping", "ping", "ping", "ping"];
  const time = [[1], [100], [3001], [3002]];
  const obj = new RecentCounter();
  const res = [];
  for (let i = 0; i < calls.length; i++) {
    res.push(obj.ping(time[i]));
  }
  console.log(res);
};

main();
