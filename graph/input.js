const { Reader } = require("../stl/reader");

const readEdge = (u, v, adjList) => {
  if (!adjList[u]) {
    adjList[u] = [];
  }
  adjList[u].push(v);
};
const validateEdge = (u, v, n) => {
  if (u < 1|| u > n || v < 1 || v > n) {
    throw new Error("Invalid edge");
  }
};
const readGraph = async () => {
  const reader = new Reader();

  const readLine = reader.input;
  const m = parseInt(await readLine());
  const n = parseInt(await readLine());

  const graph = [];
  const adjList = {};
  const directed = (await readLine("Directed? (y/n): ")) === "y";
  for (let i = 0; i < n; i++) {
    const [u, v] = (await readLine()).split(" ").map(Number);
    validateEdge(u, v, m);
    readEdge(u, v, adjList);
    if (!directed) {
      readEdge(v, u, adjList);
    }
    graph.push([u, v]);
  }
  reader.close();
  return {
    edges: graph,
    adjList,
    n,
  };
};
const adjMatrixToList = (matrix) => {
  const n = matrix.length;
  const adjList = {};
  for (let i = 0; i < n; i++) {
    const m = matrix[i]?.length;
    for (let j = 0; j < m; j++) {
      readEdge(i, j, adjList);
    }
  }
  return adjList;
};

module.exports.readGraph = readGraph;
module.exports.adjMatrixToList = adjMatrixToList;
