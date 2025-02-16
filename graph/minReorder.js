const addEdge = (u, v, adjList) => {
  if (!adjList[u]) {
    adjList[u] = new Set();
  }
  adjList[u].add(v);
};

const getAdjList = (n, connections, directed) => {
  const adjList = {};
  for (let i = 0; i < n; i++) {
    adjList[i] = new Set();
  }
  for (const [u, v] of connections) {
    addEdge(u, v, adjList);
    if (!directed) {
      addEdge(v, u, adjList);
    }
  }
  return adjList;
};

const dfsUtil = (node, adjList, visited, directedAdj, track) => {
  visited[node] = true;
  for (const dest of adjList[node]) {
    if (visited[dest]) continue;

    // Check if the original directed graph had edge (node -> dest)
    if (directedAdj[node].has(dest)) {
      track.counter += 1;
    }

    dfsUtil(dest, adjList, visited, directedAdj, track);
  }
};

var minReorder = function (n, connections) {
  const adjList = getAdjList(n, connections, false);
  const adjListDirected = getAdjList(n, connections, true);
  const visited = Array(n).fill(false);
  const tracker = { counter: 0 };

  dfsUtil(0, adjList, visited, adjListDirected, tracker);

  return tracker.counter;
};

// Test case
const val = minReorder(6, [
  [0, 1],
  [1, 3],
  [2, 3],
  [4, 0],
  [4, 5],
]);
console.log(val);
