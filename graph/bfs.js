const { Queue } = require("../stl/queue");
const { readGraph } = require("./input");

async function main() {
    const { edges, adjList } = await readGraph();
    console.log(edges);
    console.log(adjList);
    const visited = {};
    const bfsPath = [];
    bfs(Object.keys(adjList).map(Number)[0], adjList, visited, bfsPath);
    console.log({ bfsPath });
}

/**
 * 
 * @param {number} node 
 * @param {{[number]: number[]}} adjList 
 * @param {{[number]: boolean}} visited 
 * @param {number[]} path 
 * @returns {void}
 */
const bfs = (node, adjList, visited, path) => {
    const q = new Queue();
    q.enqueue(node);
    visited[node] = true;
    while (!q.isEmpty()) {
        const front = q.pop();
        path.push(front);
        const adj = adjList[front] || [];
        for (let i = 0; i < adj.length; i++) {
          const edge = adj[i];
          if (!visited[edge]) {
            visited[edge] = true;
            q.enqueue(edge);
          }
        }
    }
}

main();
module.exports.bfs = bfs;