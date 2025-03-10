const { readGraph } = require("../graph/input");
const { Pair } = require("../stl/Pair");
const { Queue } = require("../stl/queue");

const detectCycleBFS = (node, adjList, visited, parent) => {
    const q = new Queue();
    q.enqueue(new Pair(node, -1));

    while (!q.isEmpty()) {
        const node = q.pop();
        visited[node.first] = true;
        const adj = adjList[node.first] || [];
        for (let i = 0; i < adj.length; i++) {
            const edge = adj[i];
            if (!visited[edge]) {
                visited[edge] = true;
                q.enqueue(new Pair(edge, node.first));
            } else if (parent !== edge) {
                return true;
            }
        }
    }

};

const detectCycleDFS = (node, adjList, visited, parent, cache) => {
    if (cache.isCycle) {
        return true;
    }
    if(!adjList[node]) {
        return;
    }
    for (let i = 0; i < adjList[node].length; i++) {
        const edge = adjList[node][i];
        if (!visited[edge]) {
            visited[edge] = true;
            if (detectCycleDFS(edge, adjList, visited, node, cache)) {
                cache.isCycle = true;
                return true;
            }
        } else if (parent !== edge) {
            cache.isCycle = true;
            return true;
        }
    }

};
const main = async () => {
    const graph = await readGraph();
    const adjList = graph.adjList;
    const n = graph.n;
    const visited = Array(n).fill(false);
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            if (detectCycleBFS(i, adjList, visited, -1, {})) {
                console.log("Cycle detected");
                return;
            }
        }
    }
};

main();