const addEdge = (u, v, adjList, weight) => {
  if (!adjList[u]) {
    adjList[u] = new Map();
  }
  adjList[u].set(v, weight);
};
/**
 *
 * @param {string[][]} eqns
 * @returns {{[string]: Map}}
 */
const getAdjList = (eqns, values) => {
  const adjList = {};
  eqns.forEach((edge, i) => {
    const [u, v] = edge;
    const inverse = 1 / values[i];
    addEdge(u, v, adjList, values[i]);
    addEdge(v, u, adjList, inverse);
  });
  return adjList;
};

/**
 *
 * @param {string} start
 * @param {string} end
 * @param {{[string]: Map}} adjList
 * @param {{[string]: boolean}} visited
 * @returns
 */
const getPathWeight = (start, end, adjList, visited) => {
  if (!adjList[start]) {
    return -1;
  }
  if (adjList[start].has(end)) {
    return adjList[start].get(end);
  }
  visited[start] = true;
  for (let [node, weight] of adjList[start]) {
    if (visited[node]) {
        continue;
    }
    const pathWeight = getPathWeight(node, end, adjList, visited);
    if (pathWeight != -1) {
      return weight * pathWeight;
    }
  }
};
/*
[["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]

*/
var calcEquation = function (equations, values, queries) {
  const adjList = getAdjList(equations, values);
  const queryCount = queries.length;
  const result = Array(queryCount).fill(-1);
  for (let i = 0; i < queryCount; i++) {
    result[i] = getPathWeight(queries[i][0], queries[i][1], adjList, {}) || -1;
  }
  return result;
};

const eqns = [
    ["a", "b"],
    ["b", "c"],
  ],
  values = [2.0, 3.0],
  queries = [
    ["a", "c"],
    ["b", "a"],
    ["a", "e"],
    ["a", "a"],
    ["x", "x"],
  ];

const res = calcEquation(eqns, values, queries);
console.log(res);
