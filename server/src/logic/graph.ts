import _ from "lodash";
import { DailySwaps } from "../ports/the-graph";

export class Graph {
  private adjacencyList: Map<string, Set<string>>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addNode(node: string): void {
    if (!this.adjacencyList.has(node)) {
      this.adjacencyList.set(node, new Set());
    }
  }

  addEdge(node1: string, node2: string): void {
    this.addNode(node1);
    this.addNode(node2);

    this.adjacencyList.get(node1)?.add(node2);
    this.adjacencyList.get(node2)?.add(node1);
  }

  hasPathDFS(start: string, target: string): boolean {
    const visited: { [key: string]: boolean } = {};

    const dfs = (node: string): boolean => {
      if (node === target) {
        return true;
      }

      visited[node] = true;

      for (const neighbor of this.adjacencyList.get(node) || new Set()) {
        if (!visited[neighbor]) {
          if (dfs(neighbor)) {
            return true;
          }
        }
      }

      return false;
    };

    return dfs(start);
  }
}

export const hasConnectionInSwaps = _.memoize((swaps: DailySwaps["swaps"], token1: string, token2: string) => {
  const graph = new Graph()
  for (const swap of swaps) {
    graph.addEdge(swap.sellToken, swap.buyToken)
  }
  return graph.hasPathDFS(token1, token2)
})
