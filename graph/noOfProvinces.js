const readEdge = (u, v, adjList) => {
  if (!adjList[u]) {
    adjList[u] = [];
  }
  adjList[u].push(v);
};
const adjMatrixToList = (matrix) => {
  const n = matrix.length;
  const adjList = {};
  for (let i = 0; i < n; i++) {
    if (!adjList[i]) {
        adjList[i] = [];
    }
    const m = matrix[i]?.length;
    for (let j = 0; j < m; j++) {
      if (i === j) {
        continue;
      }
      if (matrix[i][j]) {
        readEdge(i, j, adjList);
      }
    }
  }
  return adjList;
};

/**
 * @param {number[][]} isConnected
 * @return {number}
 */

const checkSetSize = (n, dfsSets) => {
  const missingVal = Array.from(Array(n).keys()).find((key) => !dfsSets.has(key));
  return {
    missing: !!(missingVal || missingVal === 0),
    node: missingVal,
  };
};

const dfs = (node, adjList, visited, dfsPath) => {
  if (visited[node]) {
    return;
  }
  visited[node] = true;
  dfsPath.push(node);
  const dest = adjList[node] || [];
  dest.forEach((adjNode) => {
    dfs(adjNode, adjList, visited, dfsPath);
  });
};
var findCircleNum = function (isConnected) {
  let count = 0;
  const dfsSets = new Set();
  const adjList = adjMatrixToList(isConnected);
  let connection = checkSetSize(isConnected.length, dfsSets);
  while (connection.missing) {
    const dfsList = [];
    const visited = {};
    dfs(connection.node, adjList, visited, dfsList);
    dfsList.forEach((node) => {
      dfsSets.add(node);
    });
    count += 1;
    connection = checkSetSize(isConnected.length, dfsSets);
  }
  return count;
};

const cnt = findCircleNum([
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 1],
]);

console.log(cnt);