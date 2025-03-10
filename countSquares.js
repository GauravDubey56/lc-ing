const getNodeStr = (x, y) => `${x},${y}`;

const getNodeVal = (str) => {
  if (!str || !str.includes(",") || str.split(",").length != 2) {
    throw new Error(`${str} is not a valid co-ordinate string`);
  }
  const [x, y] = String(str).split(",").map(Number);
  return {
    x,
    y,
  };
};

const putNeighbour = (adjMap, start, end) => {
  const u = getNodeStr(...start);
  const v = getNodeStr(...end);
  if (adjMap.has(u)) {
    adjMap.get(u).add(v);
  } else {
    adjMap.set(u, new Set([v]));
  }
};
const buildGraph = (edges) => {
  if (!Array.isArray(edges)) {
    throw new Error(`Not a valid input`);
  }
  const adjMap = new Map();
  const nEdges = edges.length;
  let max = {
    x: 0,
    y: 0,
  };
  for (let i = 0; i < nEdges; i++) {
    const [u, v] = edges[i];
    max.x = Math.max(max.x, u[0], v[0]);
    max.y = Math.max(max.y, u[1], v[1]);
    putNeighbour(adjMap, u, v);
    putNeighbour(adjMap, v, u);
  }
  return {
    m: max.x,
    n: max.y,
    adjMap,
  };
};
const isTopOfSquare = (adjMap, start, end, vertical, horizontal) => {
  const startNode = getNodeVal(start);
  const endNode = getNodeVal(end);

  const l = endNode.x - startNode.x;
  const b = endNode.y - startNode.y;

  if (l !== b) {
    return false;
  }

  const right = {
    x: startNode.x + l,
    y: startNode.y,
  };
  const rightStr = getNodeStr(right.x, right.y);

  const down = {
    x: startNode.x,
    y: startNode.y + l,
  };
  const downStr = getNodeStr(down.x, down.y);

  const startAdj = adjMap.get(start);
  if (!startAdj) {
    return false;
  }
  const endAdj = adjMap.get(end);
  if (!endAdj) {
    return false;
  }

  return (
    vertical.connected(downStr, start) &&
    horizontal.connected(start, rightStr) &&
    horizontal.connected(downStr, end) &&
    vertical.connected(end, rightStr)
  );
};

class UnionFind {
  parent = {};
  rank = {};
  constructor(nodes) {
    nodes.forEach((node) => {
      this.parent[node] = node;
      this.rank[node] = 1;
    });
  }
  find(node) {
    const parent = this.parent;
    if (parent[node] != node) {
      parent[node] = this.find(parent[node]);
    }
    return parent[node];
  }
  add(node1, node2) {
    const { parent, rank } = this;
    const root1 = this.find(node1);
    const root2 = this.find(node2);

    if (root1 != root2) {
      const rank1 = rank[node1];
      const rank2 = rank[node2];
      if (rank1 > rank2) {
        parent[root2] = root1;
      } else if (rank1 < rank2) {
        parent[root1] = root2;
      } else {
        parent[root2] = root1;
        rank[root1] += 1;
      }
    }
  }
  connected(node1, node2) {
    return this.find(node1) === this.find(node2);
  }
}
const createLinearFind = (union, adjMap, node, delX, delY) => {
  if (!union instanceof UnionFind) {
    throw new Error(`Invalid union find object`);
  }
  let nodeStr = getNodeStr(node[0], node[1]);
  let adjacent = adjMap.get(nodeStr);

  if (!adjacent) {
    return;
  }

  let point = getNodeVal(nodeStr);
  while (point && point.x >= 0 && point.y >= 0) {
    const newPoint = {
      x: point.x + delX,
      y: point.y + delY,
    };
    const curr = getNodeStr(point.x, point.y);
    const newPointStr = getNodeStr(newPoint.x, newPoint.y);
    if (adjacent.has(newPointStr)) {
      union.add(newPointStr, curr);
      point.x = newPoint.x;
      point.y = newPoint.y;
    } else {
      return;
    }
  }
};

const countSquares = (edges) => {
  let count = 0;

  const { adjMap, m, n } = buildGraph(edges);
  const nodes = Array.from(adjMap.keys());

  const horizontal = new UnionFind(nodes);
  const vertical = new UnionFind(nodes);

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      createLinearFind(horizontal, adjMap, [i, j],-1, 0);
      createLinearFind(vertical, adjMap, [i, j], 0, -1);
    }
  }

  for (let i = 0; i < nodes.length - 1; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (isTopOfSquare(adjMap, nodes[i], nodes[j], vertical, horizontal)) {
        count += 1;
      }
    }
  }
  return count;
};

const edges = [
  [
    [0, 0],
    [1, 0],
  ],
  [
    [1, 0],
    [2, 0],
  ],
  [
    [2, 0],
    [2, 1],
  ],
  [
    [2, 1],
    [2, 2],
  ],
  [
    [2, 2],
    [1, 2],
  ],
  [
    [0, 2],
    [1, 2],
  ],
  [
    [0, 2],
    [0, 1],
  ],
  [
    [0, 1],
    [0, 0],
  ],
  [
    [1, 0],
    [1, 1],
  ],
  [
    [0, 1],
    [1, 1],
  ],
];

const c = countSquares(edges);

console.log(c);

// nodes[i] === `0,0` && nodes[j] === `1,1`
