const { readGraph } = require("./input");

async function main() {
    const { edges, adjList } = await readGraph();
    console.log(edges);
    console.log(adjList);
    const visited = {};
    const dfsPath = [];
    dfs(Object.keys(adjList)[0], adjList, visited, dfsPath);
    console.log({ dfsPath });
}

/**
 * 
 * @param {number} node 
 * @param {{[number]: number[]}} adjList 
 * @param {{[number]: boolean}} visited 
 * @param {number[]} dfsPath 
 * @returns {void}
 */
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
}

main();

module.exports.dfs = dfs;
