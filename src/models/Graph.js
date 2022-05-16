export default class Graph {
    vertexes;
    edges;
    constructor(vertexes, edges) {
        this.vertexes = vertexes;
        this.edges = edges;
    }

    addVertex(vertex) {
        this.vertexes.push(vertex);
    }

    addEdge(edge) {
        this.edges.push(edge);
    }

    removeVertex(id) {
        this.vertexes = this.vertexes.filter(v => v.id !== id);
        
    }

    removeEdge(id) {
        this.edges = this.edges.filter(e => e.id !== id);
    }

    removeEdgeOfVertex(vertexId) {
      
        this.edges = this.edges.filter(e => e.startVertex.id !== vertexId && e.endVertex.id !== vertexId);
    }

    getLastVertex() {
        return this.vertexes[this.vertexes.length - 1];
    }

    getLastEdge() {
        return this.edges[this.edges.length - 1];
    }
}