const { Queue } = require("../stl/queue");

const getNextIdx = (size, idx) => {
  return (idx + 1) % size;
};
const checkIfOneEmpty = (handler, rival) => {
  if (!handler instanceof Queue) {
    throw new Error(`TypeError`);
  }
  if (!rival instanceof Queue) {
    throw new Error(`TypeError`);
  }
  const isHandlerEmpty = handler.isEmpty();
  const isRivalEmpty = rival.isEmpty();
  return isHandlerEmpty != isRivalEmpty;

};
var predictPartyVictory = function (senate) {
  const radQueue = new Queue();
  const direQueue = new Queue();
  const size = senate.length;
  let i = 0;
  while (i < size) {
    const char = senate[i];
    const handlerQueue = char == "R" ? radQueue : direQueue;
    handlerQueue.enqueue(i);
    i++
  }
  while (!checkIfOneEmpty(radQueue, direQueue)) {
    const radTop = radQueue.dequeue();
    const direTop = direQueue.dequeue();
    if (radTop < direTop) {
      radQueue.add(radTop);
    } else {
      direQueue.add(direTop);
    }
  }
  return radQueue.size() > direQueue.size() ? "Radiant" : "Dire";  
};

const tests = ["RDRDD", "DRRD"];

tests.forEach((val) => {
  console.log({
    val,
    solution: predictPartyVictory(val),
  });
});
